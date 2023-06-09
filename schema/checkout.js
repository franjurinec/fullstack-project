import { z } from 'zod'

export const checkoutSessionSchema = z.object({
  success: z.boolean(),
  name: z.string(),
  email: z.string(),
})

export const newOrderSchema = z.object({
  sessionUrl: z.string(),
})
