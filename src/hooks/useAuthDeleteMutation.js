import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteAuth } from '../services/authService'
import { AUTH_QUERY_ID } from './useAuthStatusQuery'

const useAuthDeleteMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteAuth,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_ID] })
    },
  })
}

export default useAuthDeleteMutation
