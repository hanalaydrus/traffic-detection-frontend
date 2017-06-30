import { fromJS } from 'immutable';
import {
  FETCH_TICKET_DATA,
  FETCH_PROFILE_DATA,
  UPDATE_IS_FETCHING,
  UPDATE_NEW_TICKET,
  SET_FILTER,
  FETCH_COMMENT_DATA,
  UPDATE_IS_FETCHING_COMMENT,
  UPDATE_COMMENT_DATA,
  UPDATE_IS_PATCHING_TICKET_DATA,
  UPDATE_IS_FETCHING_PROFILE,
  UPDATE_NEW_SCORE
} from './constants';

const initialState = fromJS({
  data: {},
  filters: [ 'todo', 'inprogress' ],
  isFetching: false,
  isFetchingComment: false,
  isPatchingTicketData: false,
  commentData: {},
  isFetchingProfile: false,
  profileData: {}
});

function ticketDataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TICKET_DATA:
      return state.set('data', fromJS(action.payload));
    case FETCH_PROFILE_DATA:
      return state.set('profileData', fromJS(action.payload));
    case UPDATE_IS_FETCHING:
      return state.set('isFetching', action.status);
    case UPDATE_IS_FETCHING_PROFILE:
      return state.set('isFetchingProfile', action.status);
    case UPDATE_NEW_TICKET:
      return state.setIn([ 'data','tickets' ], fromJS(action.payload.tickets));
    case UPDATE_NEW_SCORE:
      return state.setIn([ 'data','total_score' ], fromJS(action.payload.total_score));
    case SET_FILTER:
      return state.set('filters', fromJS(action.filters));
    case UPDATE_IS_FETCHING_COMMENT:
      return state.set('isFetchingComment', action.status);
    case UPDATE_IS_PATCHING_TICKET_DATA:
      return state.set('isPatchingTicketData', action.status);
    case FETCH_COMMENT_DATA:
      return state.set('commentData', fromJS(action.payload));
    case UPDATE_COMMENT_DATA:
      return state.setIn([ 'commentData', 'comments' ], fromJS(action.payload));
    default:
      return state;
  }
}

export default ticketDataReducer;
