import axios from 'axios'

import { GET_ERRORS, LIST_FAKE_USERS, FAKE_USERS_LOADING } from './types'
import { FAKE_SERVER_URL } from '../config/url'

// Get users list
export const listFakeUsers = activePage => dispatch => {
  dispatch({
    type: FAKE_USERS_LOADING,
    payload: true
  })
  axios
    .get(FAKE_SERVER_URL + '/api/users?page=' + activePage)
    .then(res => {
      dispatch({
        type: LIST_FAKE_USERS,
        payload: res.data
      })
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
