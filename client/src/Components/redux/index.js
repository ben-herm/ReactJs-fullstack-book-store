import configureStore from './CreateStore'
import rootReducer from './reducers/index'

let finalReducers = rootReducer
export const store = configureStore(finalReducers)
