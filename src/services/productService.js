import { authFetch } from './authService'

export const getProducts = async () => {
  const response = await fetch('/api/products')
  return await response.json()
}

export const getProduct = async (id) => {
  const response = await fetch(`/api/products/${id}`)
  return await response.json()
}

export const createProduct = async (product) => {
  const response = await authFetch(`/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
  return await response.json()
}

export const updateProduct = async (id, product) => {
  const response = await authFetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
  return await response.json()
}

export const deactivateProduct = async (id) => {
  const response = await authFetch(`/api/products/${id}`, { method: 'DELETE' })
  return await response.json()
}
