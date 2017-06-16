import { fromJS } from 'immutable';
import normalize from 'jsonapi-normalizer'
import {
  FETCH_TICKET_DATA,
  UPDATE_IS_FETCHING,
  UPDATE_NEW_TICKET,
  SET_FILTER,
  FETCH_COMMENT_DATA,
  UPDATE_IS_FETCHING_COMMENT,
  UPDATE_COMMENT_DATA,
  UPDATE_IS_PATCHING_TICKET_DATA
} from './constants'

const initialState = fromJS({
  data: [],
  filters: ["todo"],
  isFetching: false,
  isFetchingComment: false,
  isPatchingTicketData: false,
  commentData: {}
})

function ticketDataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TICKET_DATA:
      return state.set('data', fromJS(action.payload))
    case UPDATE_IS_FETCHING:
      return state.set('isFetching', action.status)
    case UPDATE_NEW_TICKET:
      return state.setIn(['data', 'tickets'], fromJS(action.payload))
    case SET_FILTER:
      return state.set('filters', fromJS(action.filters))
    case UPDATE_IS_FETCHING_COMMENT:
      return state.set('isFetchingComment', action.status)
    case UPDATE_IS_PATCHING_TICKET_DATA:
      return state.set('isPatchingTicketData', action.status)
    case FETCH_COMMENT_DATA:
      return state.set('commentData', fromJS(action.payload))
    case UPDATE_COMMENT_DATA:
      return state.setIn(['commentData', 'comments'], fromJS(action.payload))
    default:
      return state
  }
}

export default ticketDataReducer
