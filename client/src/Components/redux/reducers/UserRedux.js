// @flow

import * as types from '../actions/types'

const INITIAL_STATE = {
  token: null,
  isAuthorized: false,
  step: 1,
  fullname: '',
  nickName: '',
  email: '',
  password: '',
  newPassword: '',
  modalActive: '',
  phone: '',
  confirmed: false,
  info: '',
  user: null,
  userID: '',
  purchsedBooks: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_USER_DATA:
      return {
        ...state,
        userLoginData: action.payload.data,
        userToken: action.payload.token
      }
    case types.SET_IS_MODAL_ACTIVE:
      return {
        ...state,
        modalActive: !state.modalActive,
        step: 1
      }
    case types.SET_LOG_OUT:
      return {
        ...state,
        isAuthorized: false,
        token: null,
        userID: '',
        user: null
      }
    case types.SET_LOG_IN:
      return {
        ...state,
        user: action.payload.user,
        isAuthorized: true,
        modalActive: false,
        token: action.payload.token,
        userID: action.payload.id,
        email: '',
        password: '',
        purchsedBooks: action.payload.user.purchsedBooks
      }
    case types.SET_REGISTRATION_DATA_FINAL:
      return {
        ...state,
        user: action.payload.user,
        isAuthorized: true,
        modalActive: false,
        token: action.payload.token,
        userID: action.payload.user.userID,
        email: '',
        password: '',
        purchsedBooks: action.payload.user.purchsedBooks
      }
    case types.SET_REGISTRATION_DATA:
      return {
        ...state,
        fullname: action.payload.fullname,
        nickName: action.payload.nickName,
        email: action.payload.email
      }
    case types.GET_USER:
      return {
        user: action.payload,
        userID: action.payload._id,
        isAuthorized: true,
        token: action.payload.token
      }

    case types.SET_FORM_DATA:
      return {
        user: action.payload,
        userID: action.payload._id,
        isAuthorized: true,
        token: action.payload.token
      }
    case types.HANDLE_STEP_UP:
      return {
        ...state,
        step: action.step,
        confirmed: action.confirmed
      }
    case types.DELETE_USER:
      return {
        ...state,
        user: null,
        isAuthorized: false,
        userID: '',
        token: null
      }
    case types.SET_PURCHSED_BOOKS:
      return {
        ...state,
        purchsedBooks: action.payload
      }
    default:
      return state
  }
}
