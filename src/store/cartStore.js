import { create } from 'zustand'
import { produce } from 'immer'

export const useCartStore = create((set) => ({
  cart: {},
  add: ({ id, ...info }, quantity) =>
    set(
      produce((draft) => {
        if (draft.cart[id]) draft.cart[id].quantity += quantity
        else
          draft.cart[id] = {
            quantity,
            ...info,
          }
      })
    ),
  removeAllById: (id) =>
    set(
      produce((draft) => {
        delete draft.cart[id]
      })
    ),
  decrementById: (id) =>
    set(
      produce((draft) => {
        if (draft.cart[id]?.quantity > 1) draft.cart[id].quantity -= 1
        else delete draft.cart[id]
      })
    ),
  incrementById: (id) =>
    set(
      produce((draft) => {
        if (draft.cart[id]?.quantity) draft.cart[id].quantity += 1
      })
    ),
}))
