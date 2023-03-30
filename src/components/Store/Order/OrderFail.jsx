import { Heading } from '@chakra-ui/react'

const OrderFail = () => (
  <>
    <Heading fontSize="3xl" fontWeight="light">
      Failed to finish processing your order, please try again later!
    </Heading>
    <Heading fontSize="lg" fontWeight="normal">
      Your payment method has not been charged at this time.
    </Heading>
  </>
)

export default OrderFail
