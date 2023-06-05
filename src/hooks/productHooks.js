import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getProducts,
  getProduct,
  deactivateProduct,
  updateProduct,
  createProduct,
} from '../services/productService'

const PRODUCTS_QUERY_ID = 'products'

export const useProductsQuery = () =>
  useQuery({
    queryKey: [PRODUCTS_QUERY_ID],
    queryFn: getProducts,
  })

export const useProductQuery = (productId) =>
  useQuery({
    queryKey: [PRODUCTS_QUERY_ID, productId],
    queryFn: () => getProduct(productId),
  })

export const useProductCreateMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_ID] })
    },
  })
}

export const useProductUpdateMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_ID] })
    },
  })
}

export const useProductRemoveMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deactivateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_ID] })
    },
  })
}
