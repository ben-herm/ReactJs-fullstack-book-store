import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { deleteUser } from '../Components/redux/actions/userActions'
import { showInfo, closeInfo } from '../Components/redux/actions/booksActions'
import { deleteUserAccount } from '../api/userApi'
const CurrentUser = () => {
  const { user, isAuthorized, userID } = useSelector(state => state.UserReducer)
  const dispatch = useDispatch()
  let date = user.registerDate && user.registerDate.split('')
  date && date.splice(-3)
  if (!isAuthorized) {
    setTimeout(() => {
      return <Redirect to='/' />
    }, 2500)
  }
  const handleDelete = () => {
    deleteUserAccount(userID).then(data => {
      dispatch(showInfo(data))
      setTimeout(() => {
        dispatch(closeInfo())
      }, 2000)
      dispatch(deleteUser())
    })
  }
  return (
    <>
      <div className='user-list'>
        <h3>Full name:</h3>
        <span>{user.fullname}</span>
      </div>
      <div className='user-list'>
        <h3>Nickname:</h3>
        <span>{user.nickName}</span>
      </div>
      <div className='user-list'>
        <h3>Phone:</h3>
        <span>{user.phone}</span>
      </div>
      <div className='user-list'>
        <h3>Email:</h3>
        <span>{user.email}</span>
      </div>
      <div className='user-list'>
        <h3>Registration:</h3>
        <span>{date}</span>
      </div>
      {!user.isAdmin ? (
        <div className='user-data-buttons'>
          <button onClick={handleDelete} className='btn-delete-user'>
            Delete account
          </button>
        </div>
      ) : null}
    </>
  )
}
export default CurrentUser
