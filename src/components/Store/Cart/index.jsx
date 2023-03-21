import useCartProductsQuery from '../../../hooks/useCartProductsQuery'

const Cart = () => {
  const { data: cartProducts, isLoading, error } = useCartProductsQuery()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error!</div>
  return (
    <div>
      {cartProducts.map((product) => {
        return (
          <div key={product.id}>
            {product.name}: {product.quantity}
          </div>
        )
      })}
    </div>
  )
}

export default Cart
