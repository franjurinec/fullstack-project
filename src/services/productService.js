export const getProducts = async () => {
  const response = await fetch('/api/products')
  return await response.json()
}
