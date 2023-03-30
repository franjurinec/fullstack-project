import { Heading } from '@chakra-ui/react'

const OrderSuccess = ({ checkoutSession }) => (
  <Heading fontSize="3xl" fontWeight="light">
    Thank you for your order, {checkoutSession.customer_details.name}!
  </Heading>
)

export default OrderSuccess
