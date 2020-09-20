import React, { useContext } from 'react'
import banksMockUp from './banksMockUp'
import { useSelector, useDispatch } from 'react-redux'
import { addPurchsedBooks } from '../api/booksApi'
import { getUser } from '../api/userApi'
import { resetCart, setBooksForCart } from './redux/actions/booksActions'
import { getUserDetails } from './redux/actions/userActions'
import { Link } from 'react-router-dom'

const BankList = ({ click, resetBasket, cartList }) => {
  const { sum, booksData } = useSelector(state => state.BooksReducer)
  const { user, userID } = useSelector(state => state.UserReducer)
  const dispatch = useDispatch()

  const handleCartsubmit = () => {
    addPurchsedBooks(userID, cartList).then(() => {
      getUser().then(user => {
        dispatch(getUserDetails(user))
      })
    })
    deleteCart()
  }

  const deleteCart = () => {
    let data = [...booksData]
    booksData.forEach((book, index) => {
      data[index].isActive = false
      data[index].count = 1
    })

    dispatch(
      setBooksForCart({
        booksData: data,
        cartStore: []
      })
    )
  }
  const mapBanksMockUp = banksMockUp.map(item => (
    <button onClick={() => handleCartsubmit()}>
      <div key={item.id} className='list'>
        <Link to='/list'>
          <i className={item.icon} />
          <p>{item.name}</p>
        </Link>
      </div>
    </button>
  ))

  return (
    <div className='bankList' onClick={click}>
      <button onClick={click}>
        <i className='far fa-times-circle' />
      </button>
      {user ? (
        <h3 style={{ marginBottom: user.nickName.length > 7 ? '8px' : null }}>
          {user.nickName}, you'll pay only: {sum} &euro;
        </h3>
      ) : (
        <h3>
          You'll pay only:{' '}
          {sum.toLocaleString('de-DE', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}{' '}
          &euro;
        </h3>
      )}
      <div className='showBanksMockUp'>{mapBanksMockUp}</div>
    </div>
  )
}

export default BankList
