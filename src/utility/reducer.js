import { Type } from './action.type'

// Helper to safely load from localStorage
const loadStorage = (key, fallback) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch {
    return fallback
  }
}

// Helper to safely save to localStorage
const saveStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.error('Failed to save to localStorage:', err)
  }
}

// Helper to safely load orders from localStorage, filtering out any old mock orders
const loadOrders = () => {
  const loaded = loadStorage('amazon_orders', [])
  if (!Array.isArray(loaded)) return []
  const cleanOrders = loaded.filter((order) => order && order.id !== '114-8392104-5829301')
  if (cleanOrders.length !== loaded.length) {
    saveStorage('amazon_orders', cleanOrders)
  }
  return cleanOrders
}

export const initialState = {
  basket: loadStorage('amazon_basket', []),
  user: loadStorage('amazon_user', null),
  orders: loadOrders()
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

      saveStorage('amazon_basket', updatedBasket)
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

      saveStorage('amazon_basket', updatedBasket)
      return {
        ...state,
        basket: updatedBasket
      }
    }

    case Type.REMOVE_FROM_BASKET: {
      const updatedBasket = state.basket.filter((item) => item.id !== action.id)
      saveStorage('amazon_basket', updatedBasket)
      return {
        ...state,
        basket: updatedBasket
      }
    }

    case Type.EMPTY_BASKET: {
      saveStorage('amazon_basket', [])
      return {
        ...state,
        basket: []
      }
    }

    case Type.SET_USER: {
      const normalizedUser = action.user
        ? {
            uid: action.user.uid,
            email: action.user.email,
            displayName: action.user.displayName || action.user.name || action.user.email?.split('@')[0] || 'Customer',
            name: action.user.displayName || action.user.name || action.user.email?.split('@')[0] || 'Customer'
          }
        : null
      saveStorage('amazon_user', normalizedUser)
      return {
        ...state,
        user: normalizedUser
      }
    }

    case Type.PLACE_ORDER: {
      const updatedOrders = [action.order, ...(state.orders || [])]
      saveStorage('amazon_orders', updatedOrders)
      saveStorage('amazon_basket', [])
      return {
        ...state,
        orders: updatedOrders,
        basket: []
      }
    }

    case Type.CLEAR_ORDERS: {
      saveStorage('amazon_orders', [])
      return {
        ...state,
        orders: []
      }
    }

    default:
      return state
  }
}
