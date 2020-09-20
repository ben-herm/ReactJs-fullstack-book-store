import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { showModal, logoutUser } from '../Components/redux/actions/userActions'
const MobileNavbar = ({ showMenu }) => {
  const dispatch = useDispatch()
  const { modalActive, isAuthorized, userID, user } = useSelector(
    state => state.UserReducer
  )
  const [logout, setLogout] = useState(false)
  const [shouldRedirect, setRedirect] = useState(false)
  const { cartStore } = useSelector(state => state.BooksReducer)
  const handleLogOut = () => {
    localStorage.clear()
    dispatch(logoutUser())
    setLogout(true)
  }

  useEffect(() => {
    if (logout) {
      setRedirect(true)
    }
    return () => {
      setRedirect(false)
    }
  }, [logout])

  return (
    <div style={{ display: showMenu ? 'flex' : null }} className='mobileNavbar'>
      <Link to='/'>Home</Link>
      <Link to='/list'>Books List</Link>
      {user && !user.isAdmin ? (
        <Link to='/history'>Purchase History</Link>
      ) : null}
      {user && !user.isAdmin ? (
        <Link className='link-cart' to='/yourCart'>
          Cart
        </Link>
      ) : null}

      {isAuthorized ? (
        <Link to={`/auth/user/${userID}`}>Profile</Link>
      ) : (
        <span onClick={() => dispatch(showModal())}>Sign in</span>
      )}

      {user && !user.isAdmin ? (
        <div className='cart'>
          <Link to='/yourCart'>
            <i className='fas fa-shopping-cart' />
            {cartStore.length > 0 ? (
              <div className='items'>
                <span>{cartStore.length}</span>
              </div>
            ) : null}
          </Link>
        </div>
      ) : null}
      {isAuthorized && (
        <span onClick={() => handleLogOut()}>
          <i className='fas fa-sign-out-alt'></i>
        </span>
      )}
    </div>
  )
}
export default MobileNavbar
