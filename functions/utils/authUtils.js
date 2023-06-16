import jwt from '@tsndr/cloudflare-worker-jwt'

export const generateToken = async (secret) =>
  await jwt.sign({ admin: true }, secret)

export const verifyToken = async (token, secret) =>
  await jwt.verify(token, secret).catch(() => false)
