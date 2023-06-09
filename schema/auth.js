import { z } from 'zod'

export const tokenSchema = z.object({
  token: z.string(),
})

export const authCheckSchema = z.object({
  authenticated: z.boolean(),
})

export const loginFormSchema = z.object({
  password: z.string().nonempty('Password is required.'),
})
