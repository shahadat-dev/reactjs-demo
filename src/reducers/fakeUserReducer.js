import { LIST_FAKE_USERS, FAKE_USERS_LOADING } from '../actions/types'

const initialState = {
  fakeUsers: [],
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LIST_FAKE_USERS:
      return {
        ...state,
        fakeUsers: action.payload,
        loading: false
      }
    case FAKE_USERS_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
  }
}
