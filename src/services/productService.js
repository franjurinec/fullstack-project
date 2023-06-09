import { productSchema, productsSchema } from '../../schema/product'
import { getAuthHeader } from './authService'

export const getProducts = async () => {
  const response = await fetch('/api/products')
  if (!response.ok) throw new Error('An error has occured.')
  const data = await response.json()
  return productsSchema.parseAsync(data).catch(() => {
    throw new Error('Invalid server response.')
  })
}

export const getProduct = async (id) => {
  if (!id) throw new Error('Product ID not specified.')
  const response = await fetch(`/api/products/${id}`)
  if (response.status === 400) throw new Error('Invalid product.')
  if (!response.ok) throw new Error('An error has occured.')
  const data = await response.json()
  return productSchema.parseAsync(data).catch(() => {
    throw new Error('Invalid server response.')
  })
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
  if (!response.ok) throw new Error('An error has occured.')
}

export const updateProduct = async ({ id, product }) => {
  if (!id) throw new Error('Product ID not specified.')
  const response = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: getAuthHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })

  if (!response.ok) throw new Error('An error has occured.')
}

export const deactivateProduct = async (id) => {
  const response = await fetch(`/api/products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: getAuthHeader() },
  })

  if (!response.ok) throw new Error('An error has occured.')
}
