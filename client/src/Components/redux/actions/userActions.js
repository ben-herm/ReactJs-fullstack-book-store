import * as types from '../actions/types'

export const logoutUser = payload => ({
  type: types.SET_LOG_OUT
})

export const getUserDetails = payload => ({
  type: types.GET_USER,
  payload
})

export const setPurchasedBooks = payload => ({
  type: types.SET_PURCHSED_BOOKS,
  payload
})

export const handleUserLogIn = payload => ({
  type: types.SET_LOG_IN,
  payload
})

export const showModal = () => ({
  type: types.SET_IS_MODAL_ACTIVE
})

export const setUserDetails = payload => ({
  type: types.SET_REGISTRATION_DATA,
  payload
})

export const deleteUser = payload => ({
  type: types.DELETE_USER
})

export const updateUser = payload => ({
  type: types.UPDATE_USER
})

export const handleUserRegistration = payload => ({
  type: types.SET_REGISTRATION_DATA_FINAL,
  payload
})

export const handleStepUp = payload => ({
  type: types.HANDLE_STEP_UP,
  step: payload.step,
  confirmed: payload.confirmed
})

export const updateUserData = async e => {
  const userAuth = this.getTokenFromLS()
  e.preventDefault()
  const {
    fullname,
    email,
    phone,
    nickName,
    userID,
    password,
    newPassword
  } = this.state
  const updateData = {
    fullname,
    email,
    phone,
    nickName,
    password,
    newPassword
  }
  const { showInfo } = this.context
  let validate = 0
  Object.entries(updateData).map(([prop, value]) => {
    if (!value || prop === 'password') validate++
    return validate
  })
  if (validate === 6) return showInfo('Change at least one field')
  else if (password.trim().length === 0) return showInfo('Password is required')
  const fetchSettings = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': userAuth.token
    },
    body: JSON.stringify(updateData)
  }
  try {
    let response = await fetch(`/user/${userID}`, fetchSettings)
    this.setState({
      fullname: '',
      email: '',
      phone: '',
      nickName: '',
      userID: '',
      password: '',
      newPassword: ''
    })
    this.getUser()
    const data = await response.json()
    showInfo(data)
  } catch (err) {
    showInfo('Something went wrong')
  }
}

export const handleStepDown = () => {
  const { step } = this.state
  this.setState({
    step: step - 1
  })
}
