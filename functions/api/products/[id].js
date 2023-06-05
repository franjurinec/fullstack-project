import Stripe from 'stripe'
import { simpleProduct } from '.'

// GET /api/products/[:id]
export const onRequestGet = async ({ env, params }) => {
  const stripe = new Stripe(env.STRIPE_API_KEY)
  const productId = params.id
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  return Response.json(simpleProduct(product))
}

// PUT /api/products/[:id]
export const onRequestPut = async ({ env, params, request, data }) => {
  if (!data.authenticated) return new Response('Unauthorized.', { status: 401 })
  const stripe = new Stripe(env.STRIPE_API_KEY)
  const productId = params.id
  const newProduct = await request.json()
  const result = await stripe.products.update(productId, newProduct)
  return Response.json(result)
}

// DELETE /api/products/[:id]
export const onRequestDelete = async ({ env, params, data }) => {
  if (!data.authenticated) return new Response('Unauthorized.', { status: 401 })
  const stripe = new Stripe(env.STRIPE_API_KEY)
  const productId = params.id
  const result = await stripe.products.update(productId, { active: false })
  return Response.json(result)
}
