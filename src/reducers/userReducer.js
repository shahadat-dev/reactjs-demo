import { LIST_USERS } from '../actions/types'

const initialState = {
  users: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LIST_USERS:
      return {
        ...state,
        users: action.payload
      }
    default:
      return state
  }
}
