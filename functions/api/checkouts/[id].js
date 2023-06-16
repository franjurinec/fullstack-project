import Stripe from 'stripe'
import { frontendCheckoutData } from '../../utils/checkoutsUtils'

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

  return Response.json(frontendCheckoutData(session))
}
