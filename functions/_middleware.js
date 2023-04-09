import jwt from '@tsndr/cloudflare-worker-jwt'

export async function onRequest({ request, env, data, next }) {
  try {
    const authHeader = request.headers.get('authorization') ?? ''
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.substring(7, authHeader.length)
      : ''

    try {
      const isValid = await jwt.verify(token, env.SECRET)
      if (!isValid) throw new Error('Invalid token!')
      data.authenticated = true
    } catch (_) {
      /* Ignore error */
    }
    return await next()
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 })
  }
}
