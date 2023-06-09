import jwt from '@tsndr/cloudflare-worker-jwt'
import { loginFormSchema } from '../../../schema/auth'

export const onRequestPost = async ({ request, env }) => {
  const data = await request.json()
  const loginData = await loginFormSchema
    .parseAsync(data)
    .catch(() => undefined)
  if (!loginData) return new Response(null, { status: 400 })

  const token =
    loginData.password === env.ADMIN_PASSWORD
      ? await jwt.sign({ admin: true }, env.SECRET)
      : undefined

  return token
    ? Response.json({ token })
    : new Response('Unauthorized.', { status: 401 })
}
