import Stripe from 'stripe'
import { simpleProduct } from './[product]'

export const onRequest = async ({ env }) => {
  const stripe = new Stripe(env.STRIPE_API_KEY)

  const products = await stripe.products
    .list({
      expand: ['data.default_price'],
    })
    .autoPagingToArray({ limit: 10000 })

  return Response.json(products.map(simpleProduct))
}
