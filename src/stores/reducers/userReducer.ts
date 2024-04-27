import type { getUserNameAction, setUserNameAction } from '../actions'
import { GET_USERNAME, SET_USERNAME } from '../actions'

const defaultState: string = ''
function userNameReducer(state = defaultState, action: getUserNameAction | setUserNameAction) {
  switch (action.type) {
    case SET_USERNAME:
      state = action.payload

      return state

    case GET_USERNAME:
      return state

    default:
      return state
  }
}
export default userNameReducer
