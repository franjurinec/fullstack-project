import Stripe from 'stripe'
import { productFormSchema } from '../../../schema/product'
import { addProductModel, frontendProductData } from '../../utils/productUtils'

// GET /api/products
export const onRequestGet = async ({ env }) => {
  const stripe = new Stripe(env.STRIPE_API_KEY)

  const products = await stripe.products
    .list({
      active: true,
      expand: ['data.default_price'],
    })
    .autoPagingToArray({ limit: 10000 })

  return Response.json(products.map(frontendProductData))
}

// POST /api/products
export const onRequestPost = async ({ env, request, data }) => {
  if (!data.authenticated) return new Response(null, { status: 401 })

  const requestData = await request.json().catch(() => undefined)
  const productData = await productFormSchema
    .parseAsync(requestData)
    .catch(() => undefined)
  if (!productData) return new Response(null, { status: 400 })

  const stripe = new Stripe(env.STRIPE_API_KEY)
  const product = addProductModel(productData)

  await stripe.products.create(product)
  return new Response(null, { status: 201 })
}
