"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import {
  ContactFormData,
  ContactFormErrors,
  SubmissionStatus,
  SERVICE_OPTIONS,
} from "@/types/contact";

const INITIAL_FORM_DATA: ContactFormData = {
  fullName: "",
  phone: "",
  email: "",
  service: "",
  message: "",
  honeypot: "",
};

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,16}$/;

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [serverFeedback, setServerFeedback] = useState<string | null>(null);

  // Validate a single field
  const validateField = (name: keyof ContactFormData, value: string): string | undefined => {
    switch (name) {
      case "fullName": {
        const trimmed = value.trim();
        if (!trimmed) return "Full name is required.";
        if (trimmed.length < 2) return "Please enter at least 2 characters.";
        if (trimmed.length > 100) return "Name cannot exceed 100 characters.";
        return undefined;
      }
      case "phone": {
        const trimmed = value.trim();
        if (!trimmed) return "Phone number is required.";
        if (!PHONE_REGEX.test(trimmed)) {
          return "Please enter a valid phone number (e.g. 647-407-2525).";
        }
        return undefined;
      }
      case "email": {
        const trimmed = value.trim();
        if (!trimmed) return "Email address is required.";
        if (!EMAIL_REGEX.test(trimmed)) {
          return "Please enter a valid email address (e.g. you@example.com).";
        }
        return undefined;
      }
      case "service": {
        const trimmed = value.trim();
        if (!trimmed) return "Please select a service.";
        return undefined;
      }
      case "message": {
        const trimmed = value.trim();
        if (!trimmed) return "Please describe your requirement.";
        if (trimmed.length < 10) {
          return "Please enter at least 10 characters.";
        }
        if (trimmed.length > 2000) {
          return "Message cannot exceed 2000 characters.";
        }
        return undefined;
      }
      default:
        return undefined;
    }
  };

  // Validate all fields on submit
  const validateAll = (): ContactFormErrors => {
    const newErrors: ContactFormErrors = {};
    (Object.keys(INITIAL_FORM_DATA) as (keyof ContactFormData)[]).forEach((field) => {
      if (field === "honeypot") return;
      const error = validateField(field, formData[field] || "");
      if (error) {
        newErrors[field] = error;
      }
    });
    return newErrors;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation after the field was first blurred
    if (touched[name as keyof ContactFormData]) {
      const fieldError = validateField(name as keyof ContactFormData, value);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }

    if (serverFeedback) {
      setServerFeedback(null);
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldError = validateField(name as keyof ContactFormData, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      service: true,
      message: true,
    });

    const validationErrors = validateAll();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("idle");
      // Focus first error field
      const firstErrorField = Object.keys(validationErrors)[0];
      const el = document.getElementById(`contact-${firstErrorField}`);
      el?.focus();
      return;
    }

    setStatus("submitting");
    setServerFeedback(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setServerFeedback(data.message || "Thank you! Your enquiry has been received. We'll be in touch.");
        setFormData(INITIAL_FORM_DATA);
        setErrors({});
        setTouched({});
      } else {
        setStatus("error");
        setServerFeedback(
          data.message || "We couldn't send your enquiry. Please try again or call us directly."
        );
        if (data.errors) {
          setErrors(data.errors);
        }
      }
    } catch {
      setStatus("error");
      setServerFeedback(
        "We couldn't send your enquiry due to a connection issue. Please try again or call 647-407-2525."
      );
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setServerFeedback(null);
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setTouched({});
  };

  return (
    <div className="rounded-2xl border border-gray-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-xs">
      {/* Form Header */}
      <div className="mb-6 border-b border-gray-100 pb-5">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B1F3A]">
          Request a Service or Quote
        </h3>
        <p className="mt-1.5 text-sm sm:text-base text-gray-600">
          Fill out the details below and our team will get back to you promptly.
        </p>
      </div>

      {/* Success Notification State */}
      {status === "success" && (
        <div
          role="alert"
          aria-live="polite"
          className="rounded-xl border border-emerald-200 bg-emerald-50/90 p-6 text-emerald-900"
        >
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </span>
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-emerald-950">Enquiry Received!</h4>
              <p className="text-sm leading-relaxed text-emerald-800">
                {serverFeedback}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                >
                  Send another enquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* General Submission Error Banner */}
      {status === "error" && serverFeedback && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-6 rounded-xl border border-rose-200 bg-rose-50/90 p-4 text-rose-900"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold">{serverFeedback}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Interactive Form */}
      {status !== "success" && (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Honeypot field (hidden from real users) */}
          <div style={{ display: "none" }} aria-hidden="true">
            <label htmlFor="contact-honeypot">Leave this blank</label>
            <input
              type="text"
              id="contact-honeypot"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Row 1: Full Name | Phone Number */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Field 1: Full Name */}
            <div>
              <label
                htmlFor="contact-fullName"
                className="mb-1.5 block text-sm font-semibold text-[#151A23]"
              >
                Full Name <span className="text-[#0755C8]" aria-hidden="true">*</span>
              </label>
              <input
                id="contact-fullName"
                name="fullName"
                type="text"
                required
                autoComplete="name"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? "contact-fullName-error" : undefined}
                disabled={status === "submitting"}
                className={`w-full h-[48px] rounded-lg border bg-white px-3.5 text-[15px] text-[#151A23] placeholder:text-gray-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#0755C8] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  errors.fullName ? "border-rose-500 bg-rose-50/20" : "border-gray-200 hover:border-gray-300"
                }`}
              />
              {errors.fullName && (
                <p
                  id="contact-fullName-error"
                  role="alert"
                  className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Field 2: Phone Number */}
            <div>
              <label
                htmlFor="contact-phone"
                className="mb-1.5 block text-sm font-semibold text-[#151A23]"
              >
                Phone Number <span className="text-[#0755C8]" aria-hidden="true">*</span>
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="Your contact number"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                disabled={status === "submitting"}
                className={`w-full h-[48px] rounded-lg border bg-white px-3.5 text-[15px] text-[#151A23] placeholder:text-gray-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#0755C8] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  errors.phone ? "border-rose-500 bg-rose-50/20" : "border-gray-200 hover:border-gray-300"
                }`}
              />
              {errors.phone && (
                <p
                  id="contact-phone-error"
                  role="alert"
                  className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Email Address | Service Required */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Field 3: Email Address */}
            <div>
              <label
                htmlFor="contact-email"
                className="mb-1.5 block text-sm font-semibold text-[#151A23]"
              >
                Email Address <span className="text-[#0755C8]" aria-hidden="true">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                disabled={status === "submitting"}
                className={`w-full h-[48px] rounded-lg border bg-white px-3.5 text-[15px] text-[#151A23] placeholder:text-gray-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#0755C8] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  errors.email ? "border-rose-500 bg-rose-50/20" : "border-gray-200 hover:border-gray-300"
                }`}
              />
              {errors.email && (
                <p
                  id="contact-email-error"
                  role="alert"
                  className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Field 4: Service Required */}
            <div>
              <label
                htmlFor="contact-service"
                className="mb-1.5 block text-sm font-semibold text-[#151A23]"
              >
                Service Required <span className="text-[#0755C8]" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <select
                  id="contact-service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.service)}
                  aria-describedby={errors.service ? "contact-service-error" : undefined}
                  disabled={status === "submitting"}
                  className={`w-full h-[48px] appearance-none rounded-lg border bg-white pl-3.5 pr-10 text-[15px] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#0755C8] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
                    formData.service ? "text-[#151A23]" : "text-gray-400"
                  } ${
                    errors.service ? "border-rose-500 bg-rose-50/20" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <option value="" disabled>
                    Select a service...
                  </option>
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option} value={option} className="text-[#151A23]">
                      {option}
                    </option>
                  ))}
                </select>
                {/* Chevron icon */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-500"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
              {errors.service && (
                <p
                  id="contact-service-error"
                  role="alert"
                  className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {errors.service}
                </p>
              )}
            </div>
          </div>

          {/* Row 3: Describe Your Requirement (Textarea) */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="contact-message"
                className="block text-sm font-semibold text-[#151A23]"
              >
                Describe Your Requirement <span className="text-[#0755C8]" aria-hidden="true">*</span>
              </label>
              <span className="text-xs text-gray-400">
                {formData.message.length}/2000
              </span>
            </div>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={4}
              placeholder="Tell us what you need help with (e.g. appliance model, current setup, preferred day)..."
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              disabled={status === "submitting"}
              className={`w-full min-h-[130px] rounded-lg border bg-white p-3.5 text-[15px] text-[#151A23] placeholder:text-gray-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#0755C8] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
                errors.message ? "border-rose-500 bg-rose-50/20" : "border-gray-200 hover:border-gray-300"
              }`}
            />
            {errors.message && (
              <p
                id="contact-message-error"
                role="alert"
                className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errors.message}
              </p>
            )}
          </div>

          {/* Row 4: Submit Button & Reassurance */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              type="submit"
              id="contact-submit-btn"
              disabled={status === "submitting"}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-lg bg-[#0755C8] px-8 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#0A66ED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755C8] focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-xs cursor-pointer"
            >
              {status === "submitting" ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Sending Enquiry...</span>
                </>
              ) : (
                <>
                  <span>Send Enquiry</span>
                  <span aria-hidden="true" className="text-base leading-none">
                    →
                  </span>
                </>
              )}
            </button>

            {/* Privacy reassurance message */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400 shrink-0"
                aria-hidden="true"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>Your details are kept strictly confidential.</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}