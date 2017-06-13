/**
 *  Import node modules
 */
import { combineReducers } from 'redux-immutable'
/**
 *  Import reducers
 *  All reducers used in the app must be declared here!
 */
import AuthReducer from './authGithub/reducer'
import TicketDataReducer from './containers/ListTicket/reducer'
/**
 *  Combine the reducers
 */
const rootReducer = combineReducers({
  authGithub: AuthReducer,
  ticketData: TicketDataReducer
})

/**
 *  Export the primary redux reducer
 */
export default rootReducer
