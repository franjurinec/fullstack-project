export const getProducts = async () => {
  const data = await fetch('/api/products').then((res) => res.json())
  console.log(data)
  return data
}
