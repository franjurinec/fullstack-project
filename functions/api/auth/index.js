import jwt from '@tsndr/cloudflare-worker-jwt'

export const onRequestPost = async ({ request, env }) => {
  const data = await request.json()

  const token =
    data?.password === env.ADMIN_PASSWORD
      ? await jwt.sign({ admin: true }, env.SECRET)
      : undefined

  return token ? Response.json({ token }) : new Response(null, { status: 401 })
}
