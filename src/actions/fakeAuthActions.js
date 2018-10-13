import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

import { GET_ERRORS, SET_FAKE_CURRENT_USER, SERVER_RESPONSE } from './types'
import { FAKE_SERVER_URL } from '../config/url'

// Login - Get User Token
export const fakeLogin = userData => dispatch => {
  axios
    .post(FAKE_SERVER_URL + '/api/login', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data
      if (token) {
        // Set token to ls
        localStorage.setItem('fakeToken', token)
        localStorage.setItem('fakeUser', JSON.stringify(userData))
        // Set token to Auth header
        setAuthToken(token)
        // Set current user
        dispatch(setFakeCurrentUser(userData))
        dispatch({
          type: SERVER_RESPONSE,
          payload: { success: `You are logged is as: ${userData.email}` }
        })
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: { error: "Can't login" }
        })
      }
    })
    .catch(err => {
      if (err.response) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      }
    })
}

// Set logged in user
export const setFakeCurrentUser = userData => {
  return {
    type: SET_FAKE_CURRENT_USER,
    payload: userData
  }
}

// Log user out
export const logoutFakeUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('fakeToken')
  // Remove auth header for future requests
  setAuthToken(false)
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setFakeCurrentUser({}))
  // Redirect to login
  window.location.href = '/'
}
