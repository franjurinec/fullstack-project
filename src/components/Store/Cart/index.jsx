import { Box, Button } from '@chakra-ui/react'
import { postCheckout } from '../../../services/checkoutService'
import { useCartStore } from '../../../store/cartStore'
import CartItem from './CartItem'

const Cart = () => {
  const cartItems = useCartStore((state) => state.cart)

  const onCheckout = () => {
    const items = Object.values(cartItems).map(
      ({ quantity, priceId: price }) => ({
        quantity,
        price,
      })
    )
    postCheckout(items).then((checkoutUrl) =>
      window.location.replace(checkoutUrl)
    )
  }

  return (
    <Box>
      {Object.entries(cartItems).map(([id, info]) => (
        <CartItem key={id} productId={id} quantity={info.quantity} />
      ))}
      <Button
        onClick={onCheckout}
        bgColor="black"
        textColor="white"
        _hover={{ bg: '#444444' }}
        _active={{
          bg: '#222222',
        }}
        size="lg"
      >
        Checkout
      </Button>
    </Box>
  )
}

export default Cart
