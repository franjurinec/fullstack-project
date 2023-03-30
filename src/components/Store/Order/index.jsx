import { useParams } from 'react-router-dom'
import useCheckoutSessionQuery from '../../../hooks/useCheckoutSessionQuery'
import OrderFail from './OrderFail'
import OrderSuccess from './OrderSuccess'

const Order = () => {
  const params = useParams()
  const {
    data: checkoutSession,
    isLoading,
    error,
  } = useCheckoutSessionQuery(params.id)
  const orderSuccessful =
    checkoutSession?.status === 'complete' &&
    checkoutSession?.payment_status === 'paid'

  if (isLoading || error) return null

  console.log(checkoutSession)

  if (orderSuccessful) return <OrderSuccess checkoutSession={checkoutSession} />
  return <OrderFail />
}

export default Order
