import { Button, Center, Heading, Link } from '@chakra-ui/react'
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

export default OrderSuccess
