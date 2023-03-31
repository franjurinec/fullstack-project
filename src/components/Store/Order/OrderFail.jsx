import { Button, Center, Heading, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const OrderFail = () => {
  return (
    <Center flexDir="column">
      <Heading fontSize="3xl" fontWeight="light">
        Failed to finalize your order, please try again later!
      </Heading>
      <Heading fontSize="lg" fontWeight="light">
        Your payment method has not been charged at this time.
      </Heading>
      <Link pt={10} as={RouterLink} to={`/`} style={{ textDecoration: 'none' }}>
        <Button
          bgColor="black"
          textColor="white"
          _hover={{ bg: '#444444' }}
          _active={{
            bg: '#222222',
          }}
          size="lg"
        >
          Return to home
        </Button>
      </Link>
    </Center>
  )
}

export default OrderFail
