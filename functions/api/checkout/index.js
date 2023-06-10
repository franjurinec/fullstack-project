import Stripe from 'stripe'

export const onRequestPost = async ({ env, request }) => {
  const stripe = new Stripe(env.STRIPE_API_KEY)
  const requestUrl = new URL(request.url).origin
  const orderUrl = `${requestUrl}/order/{CHECKOUT_SESSION_ID}`

  // TODO: Validation
  const { line_items } = await request.json().catch(() => undefined)

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items,
    success_url: orderUrl,
    cancel_url: orderUrl,
  })

  return Response.json({ sessionUrl: session.url })
}
