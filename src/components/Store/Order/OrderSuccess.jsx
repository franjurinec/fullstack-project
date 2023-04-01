import { Center, Heading, Link } from '@chakra-ui/react'
import Button from '../../common/Button'
import { Link as RouterLink } from 'react-router-dom'

const OrderSuccess = ({ checkoutSession }) => (
  <Center flexDir="column">
    <Heading fontSize="3xl" fontWeight="light">
      Thank you for your order, {checkoutSession.customer_details.name}!
    </Heading>
    <Heading fontSize="lg" fontWeight="light">
      {`You should receive your receipt at ${checkoutSession.customer_details.email} shortly.`}
    </Heading>
    <Link pt={10} as={RouterLink} to={`/`} style={{ textDecoration: 'none' }}>
      <Button>Return to home</Button>
    </Link>
  </Center>
)

export default OrderSuccess
