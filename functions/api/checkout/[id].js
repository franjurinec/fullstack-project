import Stripe from 'stripe'

export const onRequestGet = async ({ env, params }) => {
  const stripe = new Stripe(env.STRIPE_API_KEY)
  const sessionId = params.id

  const session = await stripe.checkout.sessions.retrieve(sessionId)

  return Response.json({
    success: session.status === 'complete' && session.payment_status === 'paid',
    name: session.customer_details?.name,
    email: session.customer_details?.email,
  })
}
