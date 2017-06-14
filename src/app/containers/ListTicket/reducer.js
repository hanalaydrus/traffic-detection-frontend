import { fromJS } from 'immutable';
import normalize from 'jsonapi-normalizer'
import {
  FETCH_TICKET_DATA,
  UPDATE_IS_FETCHING,
  UPDATE_NEW_TICKET,
  SET_FILTER
} from './constants'

const initialState = fromJS({
  data: [],
  filters: ["todo"],
  isFetching: false
})

function ticketDataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TICKET_DATA:
      return state.set('data', fromJS(action.payload))
    case UPDATE_IS_FETCHING:
      return state.set('isFetching', action.status)
    case UPDATE_NEW_TICKET:
      return state.set('data', fromJS(action.payload))
    case SET_FILTER:
      return state.set('filters', fromJS(action.filters))
    default:
      return state
  }
}

export default ticketDataReducer
