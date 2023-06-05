import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const useCartStore = create(
  persist(
    immer((set) => ({
      cart: {},
      add: ({ id, ...info }, quantity) =>
        set((state) => {
          if (state.cart[id]) state.cart[id].quantity += quantity
          else
            state.cart[id] = {
              quantity,
              ...info,
            }
        }),
      removeAllById: (id) =>
        set((state) => {
          delete state.cart[id]
        }),
      removeAll: () => {
        console.log('removing all')
        set((state) => {
          state.cart = {}
        })
      },
      decrementById: (id) =>
        set((state) => {
          if (state.cart[id]?.quantity > 1) state.cart[id].quantity -= 1
          else delete state.cart[id]
        }),
      incrementById: (id) =>
        set((state) => {
          if (state.cart[id]?.quantity) state.cart[id].quantity += 1
        }),
    })),
    { name: 'fj-cart-store' }
  )
)
