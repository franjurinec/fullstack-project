import jwt from '@tsndr/cloudflare-worker-jwt'

export const onRequest = async ({ request, env }) => {
  const authHeader = request.headers.get('authorization') ?? ''
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.substring(7, authHeader.length)
    : ''

  try {
    const isValid = await jwt.verify(token, env.SECRET)
    if (!isValid) throw new Error('Invalid token!')
    return Response.json({ authenticated: true })
  } catch {
    return Response.json({ authenticated: false })
  }
}
