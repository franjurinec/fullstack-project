import Stripe from 'stripe'

export const onRequestGet = async ({ env, params }) => {
  const stripe = new Stripe(env.STRIPE_API_KEY)
  const sessionId = params.id

  const session = await stripe.checkout.sessions
    .retrieve(sessionId)
    .catch((error) => {
      if (error.code === 'resource_missing') {
        return undefined
      } else throw error
    })

  if (!session) return new Response(null, { status: 404 })

  return Response.json({
    success: session.status === 'complete' && session.payment_status === 'paid',
    name: session.customer_details?.name,
    email: session.customer_details?.email,
  })
}
