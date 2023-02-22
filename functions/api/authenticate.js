import jwt from '@tsndr/cloudflare-worker-jwt'

export const onRequestPost = async ({ request, env }) => {
  const data = await request.json()

  if (data?.password !== env.ADMIN_PASSWORD) {
    return new Response(null, { status: 401 })
  }

  const token = await jwt.sign({ admin: true }, env.SECRET)

  return Response.json({ token })
}
