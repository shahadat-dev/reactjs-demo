import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  LIST_USERS,
  SERVER_RESPONSE
} from './types'
import { SERVER_URL } from '../config/url'

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post(SERVER_URL + '/api/users/register', userData)
    .then(res => {
      history.push('/login')
      dispatch({
        type: SERVER_RESPONSE,
        payload: { success: `Welcome! You have been registered successfully.` }
      })
    })
    .catch(err => {
      console.log(err)
      if (err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      }
    })
}

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post(SERVER_URL + '/api/users/login', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data
      // Set token to ls
      localStorage.setItem('jwtToken', token)
      // Set token to Auth header
      setAuthToken(token)
      // Decode token to get user data
      const decoded = jwt_decode(token)
      // Set current user
      dispatch(setCurrentUser(decoded))
    })
    .catch(err => {
      console.log(err)
      if (err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      }
    })
}

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken')
  // Remove auth header for future requests
  setAuthToken(false)
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}))
  // Redirect to login
  window.location.href = '/'
}
