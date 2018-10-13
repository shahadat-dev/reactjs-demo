import axios from 'axios'

import { GET_ERRORS, LIST_USERS } from './types'
import { SERVER_URL } from '../config/url'

// Get users list
export const listUsers = () => dispatch => {
  axios
    .get(SERVER_URL + '/api/users/list')
    .then(res => {
      dispatch({
        type: LIST_USERS,
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
