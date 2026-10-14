import { NextResponse } from "next/server";
import { SERVICE_OPTIONS } from "@/types/contact";

// Simple in-memory rate limiter: IP -> timestamps[]
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

// Validation regexes
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,16}$/;

export async function POST(request: Request) {
  try {
    // 1. IP rate limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please wait a few minutes before submitting again.",
        },
        { status: 429 }
      );
    }

    // 2. Parse request payload
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const { fullName, phone, email, service, message, honeypot } = body;

    // 3. Spam / Bot check via honeypot field
    if (honeypot && String(honeypot).trim() !== "") {
      // Silently discard bot submission
      return NextResponse.json({
        success: true,
        message: "Thank you! Your enquiry has been received. We'll be in touch.",
      });
    }

    // 4. Server-side validation
    const errors: Record<string, string> = {};

    const cleanFullName = typeof fullName === "string" ? fullName.trim() : "";
    if (!cleanFullName) {
      errors.fullName = "Full name is required.";
    } else if (cleanFullName.length < 2) {
      errors.fullName = "Please enter at least 2 characters.";
    } else if (cleanFullName.length > 100) {
      errors.fullName = "Name cannot exceed 100 characters.";
    }

    const cleanPhone = typeof phone === "string" ? phone.trim() : "";
    if (!cleanPhone) {
      errors.phone = "Phone number is required.";
    } else if (!PHONE_REGEX.test(cleanPhone)) {
      errors.phone = "Please enter a valid phone number (e.g. 647-407-2525 or +1 647 407 2525).";
    }

    const cleanEmail = typeof email === "string" ? email.trim() : "";
    if (!cleanEmail) {
      errors.email = "Email address is required.";
    } else if (!EMAIL_REGEX.test(cleanEmail)) {
      errors.email = "Please enter a valid email address (e.g. you@example.com).";
    } else if (cleanEmail.length > 150) {
      errors.email = "Email cannot exceed 150 characters.";
    }

    const cleanService = typeof service === "string" ? service.trim() : "";
    if (!cleanService) {
      errors.service = "Please select a service.";
    } else if (!SERVICE_OPTIONS.includes(cleanService as (typeof SERVICE_OPTIONS)[number])) {
      errors.service = "Please select a valid service from the list.";
    }

    const cleanMessage = typeof message === "string" ? message.trim() : "";
    if (!cleanMessage) {
      errors.message = "Please describe your requirement.";
    } else if (cleanMessage.length < 10) {
      errors.message = "Please provide at least 10 characters describing what you need.";
    } else if (cleanMessage.length > 2000) {
      errors.message = "Message cannot exceed 2000 characters.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please correct the errors in the form.",
          errors,
        },
        { status: 400 }
      );
    }

    // 5. Backend delivery or integration
    // When transactional email credentials (e.g. RESEND_API_KEY) are configured, send email here.
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: process.env.CONTACT_FROM_EMAIL || "MO'S Quick Service <onboarding@resend.dev>",
            to: [process.env.CONTACT_TO_EMAIL || "info@mosquickservices.ca"],
            subject: `New Service Enquiry: ${cleanService} from ${cleanFullName}`,
            text: `New enquiry received from website contact form:\n\nName: ${cleanFullName}\nPhone: ${cleanPhone}\nEmail: ${cleanEmail}\nService: ${cleanService}\n\nMessage:\n${cleanMessage}`,
          }),
        });

        if (!emailResponse.ok) {
          console.error("Resend delivery failed with status:", emailResponse.status);
          return NextResponse.json(
            {
              success: false,
              message: "We couldn't send your enquiry right now. Please call us directly at 647-407-2525.",
            },
            { status: 502 }
          );
        }
      } catch (sendErr) {
        console.error("Error dispatching email via Resend:", sendErr);
        return NextResponse.json(
          {
            success: false,
            message: "We couldn't send your enquiry right now. Please call us directly at 647-407-2525.",
          },
          { status: 500 }
        );
      }
    } else {
      // In development / pre-credential environment, record the enquiry securely to server logs
      console.log("[MO'S Quick Service Contact Submission]:", {
        timestamp: new Date().toISOString(),
        fullName: cleanFullName,
        phone: cleanPhone,
        email: cleanEmail,
        service: cleanService,
        messageLength: cleanMessage.length,
        note: "RESEND_API_KEY not configured. To enable live email delivery, add RESEND_API_KEY to .env.local",
      });
    }

    // 6. Return confirmed success response
    return NextResponse.json({
      success: true,
      message: "Thank you! Your enquiry has been received. We'll be in touch shortly.",
    });
  } catch (error) {
    console.error("Unhandled contact submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected server error occurred. Please try again or call us directly at 647-407-2525.",
      },
      { status: 500 }
    );
  }
}
