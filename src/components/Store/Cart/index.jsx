import { useCartStore } from '../../../store/cartStore'

const Cart = () => {
  const items = useCartStore((state) => state.cart)

  return (
    <div>
      {Object.entries(items).map(([id, quantity]) => (
        <div key={id}>
          {id}: {quantity}
        </div>
      ))}
    </div>
  )
}

export default Cart
