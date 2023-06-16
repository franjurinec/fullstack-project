const priceToString = ({ currency, unit_amount }) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(unit_amount / 100)

// Stripe -> Frontend Model
export const frontendProductData = (product) => ({
  id: product.id,
  name: product.name,
  description: product.description,
  image: product.images[0],
  price: priceToString(product.default_price),
  priceId: product.default_price.id,
  priceNumerical: product.default_price.unit_amount / 100,
})

// Frontend Form -> Create Model
export const addProductModel = (productData) => ({
  name: productData.name,
  description: productData.description,
  default_price_data: {
    currency: 'EUR',
    unit_amount: Math.round(productData.price * 100),
  },
  images: [productData.image],
})
