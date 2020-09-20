import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  handleForms,
  handleStepUp,
  handleUserLogIn
} from '../redux/actions/userActions'
import { showInfo, closeInfo } from '../redux/actions/booksActions'
import { handleLogIn } from '../../api/userApi'
const SignInForm = props => {
  const dispatch = useDispatch()
  const { user, token } = useSelector(state => state.UserReducer)
  // const { email, password } = useSelector(state => state.UserReducer)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleForm = e => {
    const name = e.target.name
    const value = e.target.value
    name == 'email' ? setEmail(value) : setPassword(value)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      handleLogIn(email, password).then(res => {
        if (res.user) {
          dispatch(handleUserLogIn(res))
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

  return (
    <>
      <div className='form'>
        <form className='forms' onSubmit={handleSubmit}>
          <h3>Sign in</h3>
          <label htmlFor='LogIn'>Your Email</label>
          <input type='text' name='email' value={email} onChange={handleForm} />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={handleForm}
          />
          <button className='form-btn'>Log in</button>
        </form>
        <h3>OR</h3>
        <button className='signUp-btn' onClick={() => props.handleSteps()}>
          Create account
        </button>
      </div>
    </>
  )
}
export default SignInForm
