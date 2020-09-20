import React from 'react'
import SignInForm from './SignInForm'
import SignUp from './SignUp'
import SignUpFinal from './SignUpFinal'
import { useDispatch, useSelector } from 'react-redux'
import RegistrationSuccess from './RegistrationSuccess'
import {
  showInfo,
  closeInfo
} from '../../Components/redux/actions/booksActions'
import {
  handleStepUp,
  setUserDetails
} from '../../Components/redux/actions/userActions'

const LoginForm = ({ step }) => {
  let showForms
  const dispatch = useDispatch()
  const { email, nickName, fullname, confirmed } = useSelector(
    state => state.UserReducer
  )
  const handleSteps = (userData = null) => {
    if (step === 2) {
      const validate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      if (
        userData.fullname.trim().length > 5 &&
        userData.nickName.trim().length > 2 &&
        validate.test(userData.email)
      ) {
        dispatch(setUserDetails(userData))
        dispatch(handleStepUp({ step: step + 1, confirmed: false }))
      } else {
        dispatch(showInfo('Please, fill out correctly all the required fields'))
        setTimeout(() => {
          dispatch(closeInfo())
        }, 2000)
        return
      }
    }
    dispatch(handleStepUp({ step: step + 1, confirmed: confirmed }))
  }

  if (step === 1) {
    return (showForms = <SignInForm handleSteps={handleSteps} />)
  } else if (step === 2) {
    return (showForms = <SignUp handleSteps={handleSteps} />)
  } else if (step === 3) {
    return (showForms = <SignUpFinal />)
  } else if (step === 4) {
    return (showForms = <RegistrationSuccess />)
  }

  return <>{showForms}</>
}
export default LoginForm
