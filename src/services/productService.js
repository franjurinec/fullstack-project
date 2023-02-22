export const getProducts = async () => {
  const data = await fetch('/api/products').then((res) => res.json())
  return data
}

export const GET_PRODUCTS = {
  queryKey: ['products'],
  queryFn: getProducts,
}
