import { useParams } from 'react-router-dom'
import OrderFail from './OrderFail'
import OrderSuccess from './OrderSuccess'
import { useCheckoutSessionQuery } from '../../../hooks/checkoutHooks'

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
  if (orderSuccessful) return <OrderSuccess checkoutSession={checkoutSession} />
  return <OrderFail />
}

export default Order
