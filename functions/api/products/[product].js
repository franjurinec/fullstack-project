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
  rawPrice: product.default_price.unit_amount,
})

export const onRequest = async ({ env, params }) => {
  const stripe = new Stripe(env.STRIPE_API_KEY)
  const productId = params.product
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  return Response.json(simpleProduct(product))
}
