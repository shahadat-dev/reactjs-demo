import { combineReducers } from 'redux'
import authReducer from './authReducer'
import fakeAuthReducer from './fakeAuthReducer'
import errorReducer from './errorReducer'
import serverResponseReducer from './serverResponseReducer'
import userReducer from './userReducer'
import fakeUserReducer from './fakeUserReducer'

export default combineReducers({
  auth: authReducer,
  fakeAuth: fakeAuthReducer,
  errors: errorReducer,
  server: serverResponseReducer,
  users: userReducer,
  fakeUsers: fakeUserReducer
})
