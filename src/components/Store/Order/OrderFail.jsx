import { Center, Heading, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import Button from '../../common/Button'

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
        <Button>Return to home</Button>
      </Link>
    </Center>
  )
}

export default OrderFail
