// @flow

import * as types from '../actions/types'

const INITIAL_STATE = {
  booksData: [],
  cartStore: [],
  sum: 0,
  itemSum: 0,
  author: '',
  title: '',
  desc: '',
  pages: '',
  print: '',
  date: '',
  cover: null,
  price: '',
  editBook: null,
  bookID: '',
  displayInfo: false,
  info: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_USER_DATA:
      return {
        ...state,
        userLoginData: action.payload.data,
        userToken: action.payload.token
      }
    case types.SHOW_MODAL:
      return {
        ...state,
        displayInfo: true,
        info: action.payload
      }
    case types.CLOSE_MODAL:
      return {
        ...state,
        displayInfo: false
      }
    case types.SET_BOOKS:
      return {
        ...state,
        booksData: action.payload
      }
    case types.SET_BOOK_ID:
      return {
        ...state,
        bookID: action.payload
      }
    case types.RESET_BOOK:
      return {
        ...state,
        author: '',
        title: '',
        desc: '',
        pages: '',
        print: '',
        date: '',
        cover: null,
        price: ''
      }
    case types.SET_SUM:
      return {
        ...state,
        sum: action.payload
      }
    case types.SET_BOOKS_FOR_CART:
      return {
        ...state,
        booksData: action.payload.booksData,
        cartStore: action.payload.cartStore
      }
    case types.RESET_CART:
      return {
        ...state,
        cartStore: []
      }
    default:
      return state
  }
}
