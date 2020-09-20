import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import BookStore from './BookStore'
import { Provider } from 'react-redux'
import { store } from '../src/Components/redux/index'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Provider store={store}>
    <BookStore />
  </Provider>,
  document.getElementById('root')
)
