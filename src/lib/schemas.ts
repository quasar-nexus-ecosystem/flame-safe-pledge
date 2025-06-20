import { z } from 'zod'

export const signatorySchema = z.object({
  name: z.string().max(60).optional(),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  organization: z.string().optional(),
  title: z.string().optional(),
  message: z.string().optional(),
  location: z.string().optional(),
  website: z.string().optional(),
  display_publicly: z.boolean(),
  social: z
    .object({
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
      github: z.string().optional(),
    })
    .optional(),
})

export type SignatoryFormValues = z.infer<typeof signatorySchema> 