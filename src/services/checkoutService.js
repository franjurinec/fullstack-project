import { checkoutSessionSchema, newOrderSchema } from '../../schema/checkout'

export const postCheckout = async (items) => {
  const response = await fetch(`/api/checkout`, {
    method: 'POST',
    redirect: 'manual',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      line_items: items,
      success_url: 'http://127.0.0.1:8788/',
      cancel_url: 'http://127.0.0.1:8788/',
    }),
  })

  if (!response.ok) throw new Error('An error has occured.')

  const data = await response.json()
  return newOrderSchema.parseAsync(data).catch(() => {
    throw new Error('Invalid server response.')
  })
}

export const getCheckoutSession = async (id) => {
  const response = await fetch(`/api/checkout/${id}`)
  if (!response.ok) throw new Error('An error has occured.')
  const data = await response.json()
  return checkoutSessionSchema.parseAsync(data).catch(() => {
    throw new Error('Invalid server response.')
  })
}
