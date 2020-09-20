import React, { useState } from 'react'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  handleForms,
  handleStepUp,
  handleUserLogIn
} from '../../Components/redux/actions/userActions'
import {
  showInfo,
  closeInfo
} from '../../Components/redux/actions/booksActions'
const SignUp = props => {
  const { fullname } = useSelector(state => state.UserReducer)
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [nickName, setNickName] = useState('')

  const handleForm = e => {
    const name = e.target.name
    const value = e.target.value
    if (name == 'fullname') {
      setName(value)
    } else if (name == 'email') {
      setEmail(value)
    } else {
      setNickName(value)
    }
  }

  const handleNextStep = (fullname, email, nickName) => {
    const data = { fullname, email, nickName }
    props.handleSteps(data)
  }

  return (
    <>
      <div className='form'>
        <div className='forms'>
          <h2>Create your account</h2>
          <label>Your full name:</label>
          <input
            type='text'
            name='fullname'
            value={name}
            onChange={handleForm}
          />
          <label>Your email:</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={handleForm}
          />
          <label>Enter your nickname</label>
          <input
            type='text'
            name='nickName'
            value={nickName}
            onChange={handleForm}
          />
          <button
            className='form-btn'
            onClick={() => handleNextStep(name, email, nickName)}
          >
            Next form
          </button>
        </div>
      </div>
    </>
  )
}
export default SignUp
