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

  if (isLoading || error) return null
  if (checkoutSession?.success)
    return <OrderSuccess checkoutSession={checkoutSession} />
  return <OrderFail />
}

export default Order
