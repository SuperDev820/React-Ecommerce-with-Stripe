import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  SET_CART_ITEM
} from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { userInfo } = getState().userLogin
  if(userInfo) {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api/carts/add', { productId: id, quantity: qty }, config)
    const { products } = data
    dispatch({
      type: CART_ADD_ITEM,
      payload: products,
      logged: true
    })
  } else {
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        productId: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        priceWithTax: data.priceWithTax || 0,
        countInStock: data.countInStock,
        quantity: qty,
      },
      logged: false
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }

}

export const getCart = () => async (dispatch, getState) => {
  const { userInfo } = getState().userLogin
  if(userInfo) {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/carts', config)
    // const { products } = data
    let products = []
    if(data.length) {
      products = data[0].products
    }
    dispatch({
      type: SET_CART_ITEM,
      payload: products
    })
  }
}

export const removeFromCart = (id) => async (dispatch, getState) => {
  const { userInfo } = getState().userLogin
  if(userInfo) {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.get(`/api/carts/delete/${id}`, config)
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id
    })
  } else {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    })
  
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
