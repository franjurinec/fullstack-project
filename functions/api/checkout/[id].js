import Stripe from 'stripe'

// const simpleSession = (product) => ({
//   id: product.id,
//   name: product.name,
//   description: product.description,
//   image: product.images[0],
//   price: new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: product.default_price.currency,
//   }).format(product.default_price.unit_amount / 100),
//   priceId: product.default_price.id,
// })

export const onRequestGet = async ({ env, params }) => {
  const stripe = new Stripe(env.STRIPE_API_KEY)
  const sessionId = params.id

  const session = await stripe.checkout.sessions.retrieve(sessionId)

  return Response.json(session)
}
