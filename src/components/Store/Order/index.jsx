import { useParams } from 'react-router-dom'
import OrderFail from './OrderFail'
import OrderSuccess from './OrderSuccess'
import { useCheckoutSessionQuery } from '../../../hooks/checkoutHooks'
import { Center, Heading, Spinner } from '@chakra-ui/react'

const Order = () => {
  const params = useParams()
  const {
    data: checkoutSession,
    isLoading,
    error,
  } = useCheckoutSessionQuery(params.id)

  if (isLoading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    )
  }

  if (error) {
    return (
      <Center>
        <Heading size="4xl" fontWeight="thin">
          AN ERROR OCCURED
        </Heading>
      </Center>
    )
  }

  if (checkoutSession?.success)
    return <OrderSuccess checkoutSession={checkoutSession} />
  return <OrderFail />
}

export default Order
