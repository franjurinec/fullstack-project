import Stripe from 'stripe'
import { simpleProduct } from '.'
import { productFormSchema } from '../../../schema/product'

// GET /api/products/[:id]
export const onRequestGet = async ({ env, params }) => {
  const stripe = new Stripe(env.STRIPE_API_KEY)
  const productId = params.id
  const product = await stripe.products
    .retrieve(productId, {
      expand: ['default_price'],
    })
    .catch(() => undefined)
  if (!product) return new Response(null, { status: 400 })

  return Response.json(simpleProduct(product))
}

// PUT /api/products/[:id]
export const onRequestPut = async ({ env, params, request, data }) => {
  if (!data.authenticated) return new Response(null, { status: 401 })

  const stripe = new Stripe(env.STRIPE_API_KEY)
  const productId = params.id

  const requestData = await request.json()
  const productData = await productFormSchema
    .parseAsync(requestData)
    .catch(() => undefined)
  if (!productData) return new Response(null, { status: 400 })

  const oldProduct = await stripe.products
    .retrieve(productId, {
      expand: ['default_price'],
    })
    .catch(() => undefined)
  if (!oldProduct) return new Response(null, { status: 400 })

  // Only modify affected fields
  const newProduct = {}

  if (productData.name !== oldProduct.name) newProduct.name = productData.name

  if (productData.description !== oldProduct.description)
    newProduct.description = productData.description

  if (productData.image !== oldProduct.images[0])
    newProduct.images = [productData.image]

  const newPriceUnitAmount = Math.round(productData.price * 100)
  if (newPriceUnitAmount !== oldProduct.default_price.unit_amount) {
    newProduct.default_price = await stripe.prices
      .create({
        product: productId,
        currency: 'EUR',
        unit_amount: newPriceUnitAmount,
      })
      .then((price) => price.id)
  }

  await stripe.products.update(productId, newProduct)
  return new Response(null, { status: 204 })
}

// DELETE /api/products/[:id]
export const onRequestDelete = async ({ env, params, data }) => {
  if (!data.authenticated) return new Response(null, { status: 401 })

  const stripe = new Stripe(env.STRIPE_API_KEY)
  const productId = params.id

  // Stripe API encourages deactivating instead of deleting
  await stripe.products.update(productId, { active: false })
  return new Response(null, { status: 204 })
}
