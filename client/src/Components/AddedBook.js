import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setSum,
  setBooksForCart
} from '../Components/redux/actions/booksActions'
import { Link } from 'react-router-dom'

const AddedBooks = ({ data, item }) => {
  const { cartStore, booksData } = useSelector(state => state.BooksReducer)

  const [cartItem, setCartItems] = useState(cartStore)
  // const { subtractItem, addItem } = data
  const { _id, price, cover, title, count, total } = item
  const dispatch = useDispatch()
  const summary = () => {
    let itemTotal = 0
    cartStore.map(item => {
      const float = parseFloat(item.total)
      itemTotal += float
      return itemTotal
    })
    const sum = itemTotal.toFixed(2)
    dispatch(setSum(sum))
  }

  const addItem = id => {
    let cart = [...cartStore]
    const findItem = cart.find(item => item._id === id)
    const index = cart.indexOf(findItem)
    const item = cart[index]
    item.count = item.count + 1
    item.total = item.count * item.price
    summary()
    dispatch(setBooksForCart({ booksData, cartStore: [...cart] }))
  }

  const subtractItem = id => {
    let cart = [...cartStore]
    const findItem = cart.find(item => item._id === id)
    const index = cart.indexOf(findItem)
    const item = cart[index]
    if (item.count <= 0) return
    item.count = item.count - 1
    item.total = item.count * item.price
    summary()
    dispatch(setBooksForCart({ booksData, cartStore: [...cart] }))
  }

  const deleteItem = id => {
    let cart = [...cartStore]
    let books = [...booksData]
    cart = cart.filter(item => item._id !== id)
    summary()
    dispatch(setBooksForCart({ booksData: books, cartStore: [...cart] }))
  }
  return (
    <div className='addedToBasketBook'>
      <div className='title'>
        <img src={cover} alt='cover' />
        <h6>{title}</h6>
      </div>
      <h5>Cost: {price} &euro;</h5>
      <div className='countItems'>
        <div>
          <button onClick={() => addItem(_id)}>+</button>
          <span>{count}</span>
          <button onClick={() => subtractItem(_id)}>-</button>
        </div>
      </div>
      <span className='total'>
        Total:{' '}
        {total.toLocaleString('de-DE', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
        &euro;
      </span>
      <div className='deleteBook'>
        <i
          style={{ marginBottom: '10px' }}
          className='fas fa-times-circle'
          onClick={() => deleteItem(_id)}
        >
          {' '}
          <p>Delete Book</p>
        </i>
        <Link style={{ marginLeft: '20px' }} to='/list'>
          Return to books
        </Link>
      </div>
    </div>
  )
}

export default AddedBooks
