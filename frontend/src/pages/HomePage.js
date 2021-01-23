import React, { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message.js'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate.js'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'

const HomePage = ({ match }) => {
  const keyword = match.params.keyword
  const categoryName = match.params.categoryName || ''
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { categories } = useSelector((state) => state.categoryList)

  const categoryId = useMemo(() => {
    const category = categories.filter((category) => category.name === categoryName)
    return category[0] && category[0]._id
  }, [categoryName, categories])
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, categoryId))
  }, [dispatch, keyword, pageNumber, categoryId])

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel categoryId={categoryId}/>
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>{categoryName ? categoryName: 'All'} Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomePage
