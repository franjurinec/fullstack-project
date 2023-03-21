import { create } from 'zustand'
import { produce } from 'immer'

export const useCartStore = create((set) => ({
  cart: {},
  add: (id, quantity) =>
    set(
      produce((draft) => {
        draft.cart[id] = (draft.cart[id] ?? 0) + quantity
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
        if (draft.cart[id] > 1) draft.cart[id]--
        else delete draft.cart[id]
      })
    ),
  incrementById: (id) =>
    set(
      produce((draft) => {
        draft.cart[id] = (draft.cart[id] ?? 0) + 1
      })
    ),
}))
