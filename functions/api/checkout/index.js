import Stripe from 'stripe'

export const onRequestPost = async ({ env, request }) => {
  const stripe = new Stripe(env.STRIPE_API_KEY)

  const { line_items, success_url, cancel_url } = await request.json()

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items,
    success_url,
    cancel_url,
  })

  return Response.json({ sessionUrl: session.url })
}
