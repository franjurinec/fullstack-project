import { z } from 'zod'

export const checkoutSessionSchema = z.object({
  success: z.boolean(),
  name: z.optional(z.string()),
  email: z.optional(z.string()),
})

export const newOrderRequestSchema = z.object({
  line_items: z.array(
    z.object({
      price: z.string(),
      quantity: z.number().int(),
    })
  ),
})

export const newOrderResponseSchema = z.object({
  sessionUrl: z.string(),
})
