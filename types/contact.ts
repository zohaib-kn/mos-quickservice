export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  honeypot?: string; // Bot trap field
}

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

export type SubmissionStatus = "idle" | "validating" | "submitting" | "success" | "error";

export interface ContactSubmissionResponse {
  success: boolean;
  message: string;
  errors?: ContactFormErrors;
}

export const SERVICE_OPTIONS = [
  "Toilet Installation",
  "Faucet Installation",
  "Fridge Water Line",
  "Dishwasher Installation",
  "Electric Range Installation",
  "Wall Oven Installation",
  "Cooktop Installation",
  "Microwave / Range Hood Installation",
  "Garburator Installation",
  "Sink Installation",
  "Vanity Installation",
  "General Handyman Services",
  "Plumbing Work",
  "BBQ / Patio Furniture Assembly",
  "Fridge Door Reversal",
  "Other",
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];
