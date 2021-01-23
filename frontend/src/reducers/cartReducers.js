import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
  SET_CART_ITEM,
} from '../constants/cartConstants'

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      // return {
      //   ...state,
      //   cartItems: item
      // }
      if(action.logged) {
        return {
          ...state,
          cartItems: item
        }
      } else {
        const existItem = state.cartItems.find((x) => x.productId == item.productId)
        console.log(existItem)
        if (existItem) {
          return {
            ...state,
            cartItems: state.cartItems.map((x) =>
              x.productId == existItem.productId ? item : x
            ),
          }
        } else {
          console.log(action.payload)
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          }
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.productId != action.payload),
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      }
    case SET_CART_ITEM:
      return {
        ...state,
        cartItems: action.payload
      }
    default:
      return state
  }
}
