import Stripe from 'stripe'
import { simpleProduct } from '.'

// GET /api/products/[:id]
export const onRequestGet = async ({ env, params }) => {
  const stripe = new Stripe(env.STRIPE_API_KEY)
  const productId = params.id
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  return Response.json(simpleProduct(product))
}

// PUT /api/products/[:id]
export const onRequestPut = async ({ env, params, request, data }) => {
  if (!data.authenticated) return new Response('Unauthorized.', { status: 401 })

  const stripe = new Stripe(env.STRIPE_API_KEY)
  const productId = params.id
  const newProductData = await request.json()

  try {
    const newProduct = {
      name: newProductData.name,
      description: newProductData.description,
      images: newProductData.images,
      default_price: await stripe.prices
        .create({
          product: productId,
          ...newProductData.default_price_data,
        })
        .then((price) => price.id),
    }
    const result = await stripe.products.update(productId, newProduct)
    return Response.json(result)
  } catch (err) {
    console.log(err)
    return new Response(`${err.message}\n${err.stack}`, { status: 500 })
  }
}

// DELETE /api/products/[:id]
export const onRequestDelete = async ({ env, params, data }) => {
  if (!data.authenticated) return new Response('Unauthorized.', { status: 401 })

  const stripe = new Stripe(env.STRIPE_API_KEY)
  const productId = params.id

  try {
    // Stripe API encourages deactivating instead of deleting products
    const result = await stripe.products.update(productId, { active: false })
    return Response.json(result)
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 })
  }
}
