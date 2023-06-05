import { getAuthHeader } from './authService'

export const getProducts = async () => {
  const response = await fetch('/api/products')
  return await response.json()
}

export const getProduct = async (id) => {
  if (!id) return null
  const response = await fetch(`/api/products/${id}`)
  return await response.json()
}

export const createProduct = async (product) => {
  const response = await fetch(`/api/products`, {
    method: 'POST',
    headers: {
      Authorization: getAuthHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
  return await response.json()
}

export const updateProduct = async ({ id, product }) => {
  console.log(JSON.stringify(product))
  const response = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: getAuthHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
  return await response.json()
}

export const deactivateProduct = async (id) => {
  const response = await fetch(`/api/products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: getAuthHeader() },
  })
  return await response.json()
}
