import { Type } from './action.type'

export const initialState = {
  basket: [],
  user: null,
  orders: []
}

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET: {
      const existingItemIndex = state.basket.findIndex(
        (item) => item.id === action.item.id
      )

      let updatedBasket = [...state.basket]

      if (existingItemIndex >= 0) {
        updatedBasket[existingItemIndex] = {
          ...updatedBasket[existingItemIndex],
          quantity: (updatedBasket[existingItemIndex].quantity || 1) + 1
        }
      } else {
        updatedBasket.push({
          ...action.item,
          quantity: action.item.quantity || 1
        })
      }

      return {
        ...state,
        basket: updatedBasket
      }
    }

    case Type.DECREMENT_QUANTITY: {
      const index = state.basket.findIndex((item) => item.id === action.id)
      let updatedBasket = [...state.basket]

      if (index >= 0) {
        if (updatedBasket[index].quantity > 1) {
          updatedBasket[index] = {
            ...updatedBasket[index],
            quantity: updatedBasket[index].quantity - 1
          }
        } else {
          updatedBasket.splice(index, 1)
        }
      }

      return {
        ...state,
        basket: updatedBasket
      }
    }

    case Type.REMOVE_FROM_BASKET: {
      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.id)
      }
    }

    case Type.EMPTY_BASKET: {
      return {
        ...state,
        basket: []
      }
    }

    case Type.SET_USER: {
      return {
        ...state,
        user: action.user
      }
    }

    case Type.PLACE_ORDER: {
      return {
        ...state,
        orders: [action.order, ...(state.orders || [])],
        basket: []
      }
    }

    default:
      return state
  }
}
