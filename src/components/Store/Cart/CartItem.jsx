import { AspectRatio, Flex, Image, Text } from '@chakra-ui/react'
import { useProductQuery } from '../../../hooks/productHooks'
import { useCartStore } from '../../../store/cartStore'
import Button from '../../common/Button'

const CartItemControls = ({ quantity, onIncrement, onDecrement }) => (
  <Flex>
    <Button
      borderLeftRadius={8}
      borderRightRadius={0}
      size="md"
      onClick={onDecrement}
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
      <Text
        data-test-class={'cart-quantity'}
        fontSize="lg"
        fontWeight="semibold"
      >
        {quantity}
      </Text>
    </Flex>
    <Button
      borderLeftRadius={0}
      borderRightRadius={8}
      size="md"
      onClick={onIncrement}
    >
      +1
    </Button>
  </Flex>
)

const CartItem = ({ productId, quantity }) => {
  const { data: product, isLoading, error } = useProductQuery(productId)
  const { incrementById, decrementById } = useCartStore()

  if (isLoading) return 'Loading...'
  if (error) return 'Error!'
  return (
    <Flex alignItems={'center'}>
      <AspectRatio ratio={1.1} w={14} mr={4}>
        <Image src={product.image} borderRadius="lg" />
      </AspectRatio>
      <Text fontSize="xl" fontWeight="semibold" flexGrow={1}>
        {product.name}
      </Text>
      <Text fontSize="xl" fontWeight="semibold" mr={4}>
        {product.price} / pc
      </Text>
      <CartItemControls
        quantity={quantity}
        onIncrement={() => incrementById(productId)}
        onDecrement={() => decrementById(productId)}
      />
    </Flex>
  )
}

export default CartItem
