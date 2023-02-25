import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  authenticate,
  isAuthenticated,
  deleteAuth,
} from '../services/authService'
import { getProducts } from '../services/productService'

const baseQueryHook = (key, fn, name) => {
  const { data, ...query } = useQuery({
    queryKey: [key],
    queryFn: fn,
  })

  return { [name ?? key]: data, ...query }
}

const baseMutationHook = (name, fn, queryKey) => {
  const queryClient = useQueryClient()
  const { mutate, ...mutation } = useMutation({
    mutationFn: fn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  })
  return { [name]: mutate, ...mutation }
}

// Products
const productsKey = 'products'
export const useProducts = () => baseQueryHook(productsKey, getProducts)

// Auth
const authKey = 'auth'
export const useAuthStatus = () =>
  baseQueryHook(authKey, isAuthenticated, 'authenticated')

export const useDeleteAuth = () =>
  baseMutationHook('deleteAuth', deleteAuth, [authKey])

export const useAuth = () =>
  baseMutationHook('authenticate', authenticate, [authKey])
