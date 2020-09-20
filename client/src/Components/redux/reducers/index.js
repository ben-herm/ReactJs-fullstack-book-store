import { combineReducers } from 'redux'
import UserReducer from './UserRedux'
import BooksReducer from './BooksRedux'

//set up persist config for movies reducer backlisting the movie paramater.

const reducers = {
  BooksReducer: BooksReducer,
  UserReducer: UserReducer
}

const appReducer = combineReducers(reducers)
export default appReducer
