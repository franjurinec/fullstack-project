import Stripe from 'stripe'
import { newOrderRequestSchema } from '../../../schema/checkout'

export const onRequestPost = async ({ env, request }) => {
  const stripe = new Stripe(env.STRIPE_API_KEY)
  const requestUrl = new URL(request.url).origin
  const orderUrl = `${requestUrl}/order/{CHECKOUT_SESSION_ID}`

  const data = await request.json().catch(() => undefined)
  const newOrderRequestData = await newOrderRequestSchema
    .parseAsync(data)
    .catch(() => undefined)
  if (!newOrderRequestData || newOrderRequestData?.line_items?.length === 0)
    return new Response(null, { status: 400 })

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: newOrderRequestData.line_items,
    success_url: orderUrl,
    cancel_url: orderUrl,
  })

  return Response.json({ sessionUrl: session.url })
}
