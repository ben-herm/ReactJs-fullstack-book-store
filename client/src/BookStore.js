import './styles/main.scss'
import './index.scss'
import React, { useEffect } from 'react'
import { Provider, useSelector, useDispatch } from 'react-redux'
import {
  getUserDetails,
  setPurchasedBooks
} from './Components/redux/actions/userActions'
import { setBooks } from './Components/redux/actions/booksActions'
import { getUser } from './api/userApi'
import { getData } from './api/booksApi'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Navigation from './Components/Navigation'
import BookList from './Components/BookList'
import PurchaseHistory from './Components/PurchaseHistory'
import ViewBook from './Components/ViewBook'
import YourCart from './Components/BookCart'
import PageNotFound from './Components/NotFound'

import EnterPage from './Components/EnterPage'
import User from './Components/User'

import InfoModal from './Components/InfoModal'

const BookStore = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    getUser().then(data => {
      dispatch(getUserDetails(data))
    })
    getData().then(data => {
      dispatch(setBooks(data))
    })
  }, [])
  const { displayInfo } = useSelector(state => state.BooksReducer)
  return (
    <Router>
      <div className='wrapper'>
        <Switch>
          <Route path='/' exact component={EnterPage} />
          <Route path='/list' exact component={BookList} />
          <Route path='/history' exact component={PurchaseHistory} />
          <Route path='/viewBook/:id' component={ViewBook} />

          <Route path='/yourCart' component={YourCart} />
          <Route path='/auth/user/:id' component={User} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
      <Navigation />
      {displayInfo && <InfoModal />}
    </Router>
  )
}

export default BookStore
