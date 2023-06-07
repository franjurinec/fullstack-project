import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  isAuthenticated,
  authenticate,
  deleteAuth,
} from '../services/authService'

const AUTH_QUERY_ID = 'auth'

export const useAuthStatusQuery = () =>
  useQuery({
    queryKey: [AUTH_QUERY_ID],
    queryFn: isAuthenticated,
  })

export const useAuthCreateMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authenticate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_ID] })
    },
  })
}

export const useAuthDeleteMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteAuth,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_ID] })
    },
  })
}
