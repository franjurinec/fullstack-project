import { useQuery } from '@tanstack/react-query'
import { isAuthenticated } from '../services/authService'

export const AUTH_QUERY_ID = 'auth'

const useAuthStatusQuery = () =>
  useQuery({
    queryKey: [AUTH_QUERY_ID],
    queryFn: isAuthenticated,
  })

export default useAuthStatusQuery
