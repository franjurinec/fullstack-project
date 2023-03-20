import { useQuery } from '@tanstack/react-query'
import { getProduct } from '../services/productService'
import { PRODUCTS_QUERY_ID } from './useProductsQuery'

const useProductQuery = (productId) =>
  useQuery({
    queryKey: [PRODUCTS_QUERY_ID, productId],
    queryFn: () => getProduct(productId),
  })

export default useProductQuery
