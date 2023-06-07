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

  return response.json().then((data) => data.sessionUrl)
}

export const getCheckoutSession = async (id) => {
  const response = await fetch(`/api/checkout/${id}`)
  if (!response.ok) throw new Error('An error has occured.')
  return response.json()
}
