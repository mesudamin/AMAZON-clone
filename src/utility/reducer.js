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

// Sample orders to showcase rich order history when user first opens the page
const sampleOrders = [
  {
    id: '114-8392104-5829301',
    created: new Date(Date.now() - 86400000 * 2).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    amount: 173.95,
    status: 'Delivered',
    deliveryDate: 'Delivered 2 days ago',
    recipient: 'Mesud Amin',
    address: 'Bole Sub-City, Addis Ababa, Ethiopia',
    items: [
      {
        id: 1,
        title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        price: 109.95,
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png',
        quantity: 1
      },
      {
        id: 9,
        title: 'WD 2TB Elements Portable External Hard Drive - USB 3.0',
        price: 64.0,
        image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png',
        quantity: 1
      }
    ]
  }
]

export const initialState = {
  basket: loadStorage('amazon_basket', []),
  user: loadStorage('amazon_user', null),
  orders: loadStorage('amazon_orders', sampleOrders)
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
      saveStorage('amazon_user', action.user)
      return {
        ...state,
        user: action.user
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
