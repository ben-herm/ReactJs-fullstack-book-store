import React, { useState } from 'react'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleRegistration } from '../../api/userApi'
import {
  showInfo,
  closeInfo
} from '../../Components/redux/actions/booksActions'
import {
  handleUserRegistration,
  handleStepUp
} from '../../Components/redux/actions/userActions'
import { Link } from 'react-router-dom'
const SignUpFinal = () => {
  const dispatch = useDispatch()
  const { fullname, nickName, email, step, confirmed } = useSelector(
    state => state.UserReducer
  )
  const [phone, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')

  const handleForm = e => {
    const name = e.target.name
    const value = e.target.value
    if (name == 'password') {
      setPassword(value)
    } else if (name == 'phone') {
      setPhoneNumber(value)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      let registerDate
      registerDate = new Date().toLocaleString()
      let newNickName = nickName[0].toUpperCase() + nickName.slice(1)
      const data = {
        fullname,
        nickName: newNickName,
        password,
        registerDate,
        phone,
        email
      }
      handleRegistration(data).then(res => {
        if (res.user) {
          dispatch(handleUserRegistration({ ...res, data }))
        } else {
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
            dispatch(showInfo(res))
            setTimeout(() => {
              dispatch(closeInfo())
            }, 2000)
          }
        }
      })
      // dispatch(handleLogIn(email, password))
    } catch (e) {
      console.log(e)
    }
  }
  //   handleSubmitForm
  return (
    <>
      <div className='form'>
        <form className='forms' onSubmit={handleSubmit}>
          <label>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={handleForm}
          />
          <label>Your phone number*</label>
          <input type='text' name='phone' value={phone} onChange={handleForm} />
          <button className='form-btn'>Confirm data</button>
        </form>
        <button
          className='form-btn'
          onClick={() =>
            dispatch(handleStepUp({ step: step - 1, confirmed: confirmed }))
          }
        >
          Previous form
        </button>
      </div>
    </>
  )
}
export default SignUpFinal
