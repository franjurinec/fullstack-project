import Stripe from 'stripe'
import { simpleProduct } from '.'

export const onRequestGet = async ({ env, params }) => {
  const stripe = new Stripe(env.STRIPE_API_KEY)
  const productId = params.product
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  return Response.json(simpleProduct(product))
}
