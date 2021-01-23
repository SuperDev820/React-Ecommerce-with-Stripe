import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import { listCategories, createCategory, updateCategory, listCategoryDetails } from '../actions/categoryActions'
import { CATEGORY_UPDATE_RESET, CATEGORY_CREATE_RESET } from '../constants/categoryConstants'

const CategoryEditPage = ({ match, history, isCreate }) => {
  const categoryId = !isCreate && match.params.id

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  
  const categoryUpdate = useSelector((state) => state.categoryUpdate)
  const categoryCreate = useSelector((state) => state.categoryCreate)
  const categoryDetails = useSelector((state) => state.categoryDetails)
  const { loading, error, category } = categoryDetails

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categoryUpdate

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = categoryCreate

  useEffect(() => {
    dispatch(listCategories())
    if(isCreate) {
      if (successCreate) {
        dispatch({ type: CATEGORY_CREATE_RESET })
        history.push('/admin/categorylist')
      }
    } else {
      if (successUpdate) {
        dispatch({ type: CATEGORY_UPDATE_RESET })
        history.push('/admin/categorylist')
      } else {
        if (!category.name || category._id !== categoryId) {
          dispatch(listCategoryDetails(categoryId))
        } else {
          setName(category.name)
          setDescription(category.description)
        }
      }
    }
  }, [dispatch, history, categoryId, category, successUpdate, successCreate])

  const submitHandler = (e) => {
    e.preventDefault()
    if(isCreate) {
      dispatch(
        createCategory({
          name,
          description,
        })
      )
    } else {
      dispatch(
        updateCategory({
          _id: categoryId,
          name,
          description,
        })
      )
    }
  }

  return (
    <>
      <Link to='/admin/categorylist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>{isCreate ? 'Create ' : 'Edit '} a Category</h1>
        {(loadingUpdate || loadingCreate) && <Loader />}
        {(errorUpdate || errorCreate) && <Message variant='danger'>{isCreate ? errorCreate : errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              {isCreate ? 'Create' : 'Update'}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default CategoryEditPage
