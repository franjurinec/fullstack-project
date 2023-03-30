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
  const data = await response.json()
  return data.sessionUrl
}

export const getCheckoutSession = async (id) => {
  const response = await fetch(`/api/checkout/${id}`)
  return await response.json()
}
