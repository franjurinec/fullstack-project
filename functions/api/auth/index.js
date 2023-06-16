import { loginFormSchema } from '../../../schema/auth'
import { generateToken } from '../../utils/authUtils'

export const onRequestPost = async ({ request, env }) => {
  const data = await request.json().catch(() => undefined)
  const loginData = await loginFormSchema
    .parseAsync(data)
    .catch(() => undefined)

  if (!loginData) return new Response(null, { status: 400 })

  if (loginData.password !== env.ADMIN_PASSWORD)
    return new Response('Unauthorized.', { status: 401 })

  const token = await generateToken(env.SECRET)

  return Response.json({ token })
}
