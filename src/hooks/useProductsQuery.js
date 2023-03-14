import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../services/productService'

export const PRODUCTS_QUERY_ID = 'products'

const useProductsQuery = () =>
  useQuery({
    queryKey: [PRODUCTS_QUERY_ID],
    queryFn: getProducts,
  })

export default useProductsQuery
