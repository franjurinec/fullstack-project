import { Box } from '@chakra-ui/react'
import Button from '../../common/Button'
import CartItem from './CartItem'
import { postCheckout } from '../../../services/checkoutService'
import { useCartStore } from '../../../store/cartStore'
import { useMemo } from 'react'

const Cart = () => {
  const cartItems = useCartStore((state) => state.cart)

  const items = useMemo(
    () =>
      Object.values(cartItems).map(({ quantity, priceId: price }) => ({
        quantity,
        price,
      })),
    [cartItems]
  )

  const onCheckout = () =>
    postCheckout(items).then((checkoutUrl) =>
      window.location.replace(checkoutUrl)
    )

  return (
    <Box>
      {Object.keys(cartItems).length ? (
        <>
          {Object.entries(cartItems).map(([id, info]) => (
            <CartItem key={id} productId={id} quantity={info.quantity} />
          ))}
          <Button onClick={onCheckout}>Checkout</Button>
        </>
      ) : (
        <div>Cart Empty!</div>
      )}
    </Box>
  )
}

export default Cart
