import { useQuery } from '@tanstack/react-query'
import { getCheckoutSession } from '../services/checkoutService'

export const CHECKOUT_SESSIONS_QUERY_ID = 'checkoutSessions'

const useCheckoutSessionQuery = (sessionId) =>
  useQuery({
    queryKey: [CHECKOUT_SESSIONS_QUERY_ID, sessionId],
    queryFn: () => getCheckoutSession(sessionId),
  })

export default useCheckoutSessionQuery
