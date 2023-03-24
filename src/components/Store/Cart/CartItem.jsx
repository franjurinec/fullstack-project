import { Button, Flex, Text } from '@chakra-ui/react'
import useProductQuery from '../../../hooks/useProductQuery'
import { useCartStore } from '../../../store/cartStore'

const CartItem = ({ productId, quantity }) => {
  const { data: product, isLoading, error } = useProductQuery(productId)
  const { incrementById, decrementById } = useCartStore()

  if (isLoading) return 'Loading...'
  if (error) return 'Error!'
  return (
    <Flex>
      <Text flexGrow={1}>{product.name}</Text>

      <Flex>
        <Button onClick={() => decrementById(productId)}>-1</Button>
        <Flex w={12} justifyContent="center" alignItems="center">
          <Text>{quantity}</Text>
        </Flex>
        <Button onClick={() => incrementById(productId)}>+1</Button>
      </Flex>
    </Flex>
  )
}

export default CartItem
