import { useQuery } from '@tanstack/react-query'
import { getProduct } from '../services/productService'
import { useCartStore } from '../store/cartStore'

export const PRODUCTS_QUERY_ID = 'products'

const useCartProductsQuery = () => {
  const cartItems = useCartStore((state) => state.cart)
  const productIds = Object.keys(cartItems)
  const queries = Object.fromEntries(
    productIds.map((productId) => [
      productId,
      useQuery({
        queryKey: [PRODUCTS_QUERY_ID, productId],
        queryFn: () => getProduct(productId),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      }),
    ])
  )

  console.log(Object.values(queries))

  return {
    data: productIds.map((productId) => ({
      quantity: cartItems[productId],
      ...queries[productId].data,
    })),
    isLoading: Object.values(queries).reduce(
      (isLoading, query) => isLoading || query.isLoading,
      false
    ),
    error: Object.values(queries).reduce(
      (error, query) => error || query.error,
      false
    ),
  }
}

export default useCartProductsQuery
