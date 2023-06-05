import { useQuery } from '@tanstack/react-query'
import { getCheckoutSession } from '../services/checkoutService'

const CHECKOUT_SESSIONS_QUERY_ID = 'checkoutSessions'

export const useCheckoutSessionQuery = (sessionId) =>
  useQuery({
    queryKey: [CHECKOUT_SESSIONS_QUERY_ID, sessionId],
    queryFn: () => getCheckoutSession(sessionId),
  })
