import jwt from '@tsndr/cloudflare-worker-jwt'

const verifyAdmin = async (request, secret, data) => {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) return
  const token = authHeader.substring('Bearer '.length)
  data.authenticated = await jwt.verify(token, secret).catch(() => false)
}

export const onRequest = async ({ request, env, data, next }) => {
  await verifyAdmin(request, env.SECRET, data)

  return next().catch(
    // Catch all server errors
    (error) => {
      console.log(error)
      return new Response('A server error has occured.', { status: 500 })
    }
  )
}
