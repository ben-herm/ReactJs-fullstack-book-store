import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateUser,
  getUserDetails
} from '../Components/redux/actions/userActions'
import { showInfo, closeInfo } from '../Components/redux/actions/booksActions'
import { updateUserAccount, getUser } from '../api/userApi'
const UpdateUser = ({ click }) => {
  const dispatch = useDispatch()
  const { user, fullname, email, phone, nickName, userID } = useSelector(
    state => state.UserReducer
  )
  const [changePass, setNewPass] = useState(false)
  const [newEmail, setNewEmail] = useState(user.email)
  const [newName, setNewName] = useState(user.fullname)
  const [newNickName, setNewNickName] = useState(user.nickName)
  const [newPasswordTxt, setNewPassword] = useState('')
  const [newPass, setNewPassTxt] = useState('')
  const [newPhone, setNewPhone] = useState(user.phone)

  const handleForm = e => {
    const name = e.target.name
    const value = e.target.value
    if (name == 'fullname') {
      setNewName(value)
    } else if (name == 'nickName') {
      setNewNickName(value)
    } else if (name == 'password') {
      setNewPassword(value)
    } else if (name == 'email') {
      setNewEmail(value)
    } else if (name == 'newPassword') {
      setNewPassTxt(value)
    } else {
      setNewPhone(value)
    }
  }

  const handleUpdate = e => {
    e.preventDefault()
    const data = {
      fullname: newName,
      email: newEmail,
      phone: newPhone,
      nickName: newNickName,
      userID,
      password: newPass
    }
    let validate = 0
    Object.entries(user).map(([prop, value]) => {
      if (!value || prop === 'password') validate++
      return validate
    })
    if (validate === 6) dispatch(showInfo('Change at least one field'))
    if (newPasswordTxt != newPass) {
      dispatch(showInfo('Passwords are not equal'))
      setTimeout(() => {
        dispatch(closeInfo())
      }, 2000)
      return
    } else if (newPasswordTxt.trim().length === 0) {
      dispatch(showInfo('Password is required'))
      setTimeout(() => {
        dispatch(closeInfo())
      }, 2000)
      return
    }
    let newData = { ...data, userID }
    updateUserAccount(newData).then(res => {
      if (res.errors) {
        if (res.errors > 1) {
          dispatch(showInfo(JSON.stringify(res)))
        } else {
          dispatch(showInfo(res))
        }
        setTimeout(() => {
          dispatch(closeInfo())
        }, 2000)
      } else {
        getUser().then(data => {
          dispatch(getUserDetails(data))
        })
        dispatch(showInfo(res))
        setTimeout(() => {
          dispatch(closeInfo())
        }, 2000)
      }
    })
  }

  return (
    <div className='show-modal'>
      <form onSubmit={handleUpdate} className='cms-form'>
        <div onClick={() => click(false)} className='close'>
          <i className='far fa-times-circle'></i>
        </div>
        <label> full name</label>
        <input
          type='text'
          value={newName}
          name='fullname'
          placeholder={user.fullname}
          onChange={handleForm}
        />

        <label>nickname</label>
        <input
          type='text'
          value={newNickName}
          name='nickName'
          placeholder={user.nickName}
          onChange={handleForm}
        />

        <label> email</label>
        <input
          type='email'
          value={newEmail}
          name='email'
          placeholder={user.email}
          onChange={handleForm}
        />

        <label>phone number</label>
        <input
          type='text'
          value={newPhone}
          name='phone'
          placeholder={user.phone}
          onChange={handleForm}
        />
        {
          <>
            <label>Enter new password</label>
            <input
              type='password'
              value={newPass}
              name='newPassword'
              onChange={handleForm}
              autoComplete='new-password'
            />{' '}
          </>
        }
        <label>
          <>To confirm, enter password</>
        </label>
        <input
          type='password'
          value={newPasswordTxt}
          name='password'
          onChange={handleForm}
        />
        <button>Confirm</button>
      </form>
    </div>
  )
}
export default UpdateUser
