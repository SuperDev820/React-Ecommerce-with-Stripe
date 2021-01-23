import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import ProfilePage from './pages/ProfilePage'
import UserListPage from './pages/UserListPage'
import UserEditPage from './pages/UserEditPage'
import ProductListPage from './pages/ProductListPage'
import ProductEditPage from './pages/ProductEditPage'
import CategoryListPage from './pages/CategoryListPage'
import CategoryEditPage from './pages/CategoryEditPage'
import OrderPage from './pages/OrderPage'

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/' component={HomePage} exact />
          <Route path='/search/:keyword' component={HomePage} exact />
          <Route path='/page/:pageNumber' component={HomePage} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomePage}
            exact
          />
          <Route path='/category/:categoryName' component={HomePage} exact />
          <Route path='/login' component={LoginPage} exact />
          <Route path='/register' component={RegisterPage} exact />
          <Route path='/product/:id' component={ProductPage} exact />
          <Route path='/cart/:id?' component={CartPage} exact />
          <Route path='/profile' component={ProfilePage} exact />
          <Route path='/admin/userlist' component={UserListPage} />
          <Route path='/admin/user/:id/edit' component={UserEditPage} />
          <Route
            path='/admin/productlist'
            component={ProductListPage}
            exact
          />
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductListPage}
            exact
          />
          <Route path='/admin/product/:id/edit' component={ProductEditPage} />
          <Route 
            path='/admin/product/create' 
            render={
              (props) => <ProductEditPage {...props} isCreate={true}/>
            } 
          />
           <Route
            path='/admin/categorylist'
            component={CategoryListPage}
            exact
          />
          <Route path='/admin/category/:id/edit' component={CategoryEditPage} />
          <Route 
            path='/admin/category/create' 
            render={
              (props) => <CategoryEditPage {...props} isCreate={true}/>
            } 
          />
          <Route path='/order/:id' component={OrderPage} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
