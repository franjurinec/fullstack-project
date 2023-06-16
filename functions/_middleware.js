import { verifyToken } from './utils/authUtils'

const verifyAuth = async (request, secret) => {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) return
  const token = authHeader.substring('Bearer '.length)
  return await verifyToken(token, secret)
}

export const onRequest = async ({ request, env, data, next }) => {
  data.authenticated = await verifyAuth(request, env.SECRET)

  return next().catch(
    // Catch all server errors
    (error) => {
      console.error(error)
      return new Response('A server error has occured.', { status: 500 })
    }
  )
}
