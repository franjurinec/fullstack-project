import { Flex, Heading, Link, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'
import { useMemo } from 'react'

const Header = () => {
  const cartItems = useCartStore((state) => state.cart)
  const itemCount = useMemo(
    () =>
      Object.values(cartItems).reduce((res, item) => res + item.quantity, 0),
    [cartItems]
  )

  return (
    <Flex
      justifyContent="center"
      maxWidth="full"
      width="full"
      borderBottom="2px"
      mb="16"
    >
      <Flex
        as="header"
        px="16px"
        height="32"
        maxWidth="8xl"
        flexGrow={1}
        alignItems="center"
        wrap="wrap"
      >
        <Flex flexGrow={1}>
          <Link as={RouterLink} to="/" style={{ textDecoration: 'none' }}>
            <Heading size="3xl">
              GOOD.
              <Text as="span" fontWeight="thin">
                STORE
              </Text>
            </Heading>
          </Link>
        </Flex>
        <Link as={RouterLink} to="/cart" style={{ textDecoration: 'none' }}>
          <Heading size="3xl" fontWeight="thin">
            CART {!!itemCount && `(${itemCount})`}
          </Heading>
        </Link>
      </Flex>
    </Flex>
  )
}

export default Header
