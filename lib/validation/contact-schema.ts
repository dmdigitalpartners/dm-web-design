import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Моля, въведете името си.")
    .max(100, "Името е твърде дълго."),
  email: z
    .string()
    .trim()
    .email("Моля, въведете валиден имейл адрес.")
    .max(200),
  message: z
    .string()
    .trim()
    .min(10, "Разкажете ни поне с едно изречение за какво става дума.")
    .max(5000, "Съобщението е твърде дълго."),
  // Honeypot, real users never fill this hidden field
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
