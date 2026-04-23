import { Resend } from "resend";

export const resend = new Resend(process.env.VITE_RESEND_API_KEY);
