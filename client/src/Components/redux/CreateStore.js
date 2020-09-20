import { createStore, applyMiddleware, compose } from 'redux'

// create the store
export default rootReducer => {
  const store = createStore(rootReducer)

  return store
}
