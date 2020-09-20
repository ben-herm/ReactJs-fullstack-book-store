import React, { useContext, useState, useEffect } from 'react'
import AdminPanel from './AdminPanel'
import { useSelector, useDispatch } from 'react-redux'
import CurrentUser from './CurrentUser'
import UpdateUser from './UpdateUser'
import { Redirect } from 'react-router-dom'
const User = () => {
  const { user, isAuthorized } = useSelector(state => state.UserReducer)
  const [showPanel, displayAdminPanel] = useState(false)
  const [update, updateUserData] = useState(false)
  const [updateBook, showUpdateBook] = useState(false)
  const [addBook, showAddBook] = useState(false)
  const [logout, setLogout] = useState(false)
  const userAuth = JSON.parse(localStorage.getItem('auth-token'))
  useEffect(() => {
    const handleClick = e => {
      const target = e.target
      if (target.closest('.cms-form')) return
      if (target.closest('.show-modal')) {
        updateUserData(false)
        showUpdateBook(false)
        showAddBook(false)
        return
      }
    }
    let timeout
    document.addEventListener('click', handleClick)
    if (!isAuthorized) {
      setLogout(true)
    }

    return () => {
      document.addEventListener('click', handleClick)
      clearTimeout(timeout)
    }
  })
  if (logout) {
    return <Redirect to='/' />
  }
  return (
    <>
      {user && (
        <section className='userProfile'>
          <button className='user-btn' onClick={() => updateUserData(true)}>
            <i className='fas fa-user-edit'></i> Update
          </button>
          <div className='user-data'>
            {!update ? <CurrentUser /> : <UpdateUser click={updateUserData} />}
          </div>
          {user.isAdmin && (
            <button
              onClick={() => displayAdminPanel(!showPanel)}
              className='main-btn btn-admin'
            >
              Show Admin Panel
            </button>
          )}
          {showPanel && (
            <AdminPanel
              addBook={addBook}
              updateBook={updateBook}
              showUpdateBook={showUpdateBook}
              showAddBook={showAddBook}
            />
          )}
        </section>
      )}
    </>
  )
}
export default User
