import { Center, Container, Flex, Heading, Link } from '@chakra-ui/react'
import Button from '../../common/Button'
import CartItem from './CartItem'
import { postCheckout } from '../../../services/checkoutService'
import { useCartStore } from '../../../store/cartStore'
import { useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'

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
    <Container maxW={'container.md'} data-test-class={'cart-display'}>
      {Object.keys(cartItems).length ? (
        <>
          <Flex flexDir="column" gap={4}>
            {Object.entries(cartItems).map(([id, info]) => (
              <CartItem key={id} productId={id} quantity={info.quantity} />
            ))}
          </Flex>
          <Flex mt={12} justifyContent={'flex-end'}>
            <Button onClick={onCheckout}>Checkout</Button>
          </Flex>
        </>
      ) : (
        <Center flexDir="column">
          <Heading fontSize="3xl" fontWeight="light">
            Your cart is empty!
          </Heading>
          <Link
            pt={10}
            as={RouterLink}
            to={`/`}
            style={{ textDecoration: 'none' }}
          >
            <Button>Return to home</Button>
          </Link>
        </Center>
      )}
    </Container>
  )
}

export default Cart
