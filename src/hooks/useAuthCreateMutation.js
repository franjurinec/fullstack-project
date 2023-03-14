import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authenticate } from '../services/authService'
import { AUTH_QUERY_ID } from './useAuthStatusQuery'

const useAuthCreateMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authenticate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_ID] })
    },
  })
}

export default useAuthCreateMutation
