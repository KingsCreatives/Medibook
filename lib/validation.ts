import { Phone } from "lucide-react";
import { z } from "zod";

export const UserFormValidation = z.object({
  username: z.string()
  .min(5, "Name must be at least 5 characters")
  .max(20,  "Name must be at most 20 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});