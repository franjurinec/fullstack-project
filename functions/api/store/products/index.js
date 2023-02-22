import Stripe from 'stripe'

export const onRequest = async ({ env }) => {
  const stripe = new Stripe(env.STRIPE_API_KEY)

  const products = await stripe.products
    .list()
    .autoPagingToArray({ limit: 10000 })

  return new Response(JSON.stringify(products, null, 2))
}
