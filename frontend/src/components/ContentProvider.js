import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../actions/cartActions'

const ContentProvider = ({ children }) => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])
  return (
    <div>
      {children}
    </div>
  )
}

export default ContentProvider