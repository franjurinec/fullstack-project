import Stripe from 'stripe'

// Stripe -> Frontend Model
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
  priceNumerical: product.default_price.unit_amount / 100,
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
  const productData = await request.json()
  const product = {
    name: productData.name,
    description: productData.description,
    default_price_data: {
      currency: 'EUR',
      unit_amount: Math.round(productData.price * 100),
    },
    images: [productData.image],
  }

  const result = await stripe.products.create(product)
  return Response.json(result)
}
