export const getProducts = async () => {
  const response = await fetch('/api/products')
  return await response.json()
}

export const getProduct = async (id) => {
  const response = await fetch(`/api/products/${id}`)
  return await response.json()
}
