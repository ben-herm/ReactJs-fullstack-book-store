import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './LoginForm'
import { showModal } from '../redux/actions/userActions'

const SignInModal = () => {
  const dispatch = useDispatch()
  const { step } = useSelector(state => state.UserReducer)
  return (
    <div className='loginForm'>
      <button className='formModalClose' onClick={() => dispatch(showModal())}>
        <i className='fas fa-times' />
      </button>
      <LoginForm step={step} />
    </div>
  )
}
export default SignInModal
