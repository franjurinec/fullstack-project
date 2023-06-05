import Stripe from 'stripe'

export const simpleProduct = (product) => ({
  id: product.id,
  name: product.name,
  description: product.description,
  image: product.images[0],
  price: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.default_price.currency,
  }).format(product.default_price.unit_amount / 100),
  priceId: product.default_price.id,
})

// GET /api/products
export const onRequestGet = async ({ env }) => {
  const stripe = new Stripe(env.STRIPE_API_KEY)

  const products = await stripe.products
    .list({
      active: true,
      expand: ['data.default_price'],
    })
    .autoPagingToArray({ limit: 10000 })

  return Response.json(products.map(simpleProduct))
}

// POST /api/products
export const onRequestPost = async ({ env, request, data }) => {
  if (!data.authenticated) return new Response('Unauthorized.', { status: 401 })
  const stripe = new Stripe(env.STRIPE_API_KEY)
  const product = await request.json()
  const result = await stripe.products.create(product)
  return Response.json(result)
}
