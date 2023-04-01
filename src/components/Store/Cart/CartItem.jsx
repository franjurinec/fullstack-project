import { Flex, Text } from '@chakra-ui/react'
import useProductQuery from '../../../hooks/useProductQuery'
import { useCartStore } from '../../../store/cartStore'
import Button from '../../common/Button'

const CartItem = ({ productId, quantity }) => {
  const { data: product, isLoading, error } = useProductQuery(productId)
  const { incrementById, decrementById } = useCartStore()

  if (isLoading) return 'Loading...'
  if (error) return 'Error!'
  return (
    <Flex>
      <Text fontSize="xl" fontWeight="semibold" flexGrow={1}>
        {product.name}
      </Text>

      <Flex>
        <Button
          borderLeftRadius={8}
          borderRightRadius={0}
          size="md"
          onClick={() => decrementById(productId)}
        >
          -1
        </Button>
        <Flex
          borderWidth={2}
          borderColor="black"
          w={12}
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="lg" fontWeight="semibold">
            {quantity}
          </Text>
        </Flex>
        <Button
          borderLeftRadius={0}
          borderRightRadius={8}
          size="md"
          onClick={() => incrementById(productId)}
        >
          +1
        </Button>
      </Flex>
    </Flex>
  )
}

export default CartItem
