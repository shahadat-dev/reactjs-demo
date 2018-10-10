import isEmpty from 'lodash/isEmpty'
import { SET_FAKE_CURRENT_USER } from '../actions/types'

const initialState = {
  isFakeAuthenticated: false,
  fakeUser: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FAKE_CURRENT_USER:
      return {
        ...state,
        isFakeAuthenticated: !isEmpty(action.payload),
        fakeUser: action.payload
      }
    default:
      return state
  }
}
