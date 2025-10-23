import { z } from 'zod';

// Phone number regex - supports international formats
const phoneRegex = /^\+?[1-9]\d{9,14}$/;

export const volunteerSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z.string()
    .trim()
    .regex(phoneRegex, "Invalid phone number format. Use international format (e.g., +919876543210)"),
  skills: z.string()
    .max(500, "Skills description must be less than 500 characters")
    .optional()
});

export const csrSchema = z.object({
  company_name: z.string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(200, "Company name must be less than 200 characters"),
  contact_person: z.string()
    .trim()
    .min(2, "Contact person name must be at least 2 characters")
    .max(100, "Contact person name must be less than 100 characters"),
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z.string()
    .trim()
    .regex(phoneRegex, "Invalid phone number format. Use international format (e.g., +919876543210)"),
  message: z.string()
    .max(2000, "Message must be less than 2000 characters")
    .optional()
});

export const donationSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  occasion: z.enum(['birthday', 'wedding', 'anniversary', 'corporate', 'memorial', 'other'], {
    errorMap: () => ({ message: "Please select a valid occasion" })
  }),
  treeCount: z.number()
    .int("Number of trees must be a whole number")
    .min(1, "Must donate at least 1 tree")
    .max(100, "Cannot donate more than 100 trees in a single transaction"),
  message: z.string()
    .max(1000, "Message must be less than 1000 characters")
    .optional()
});

export const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  subject: z.string()
    .trim()
    .min(2, "Subject must be at least 2 characters")
    .max(200, "Subject must be less than 200 characters"),
  message: z.string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters")
});
