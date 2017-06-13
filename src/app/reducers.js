/**
 *  Import node modules
 */
import { combineReducers } from 'redux-immutable'
/**
 *  Import reducers
 *  All reducers used in the app must be declared here!
 */
import AuthReducer from './authGithub/reducer'
import ToogleDrawerReducer from './containers/Dashboard/reducer'
/**
 *  Combine the reducers
 */
const rootReducer = combineReducers({
  authGithub: AuthReducer,
  toggleDrawer: ToogleDrawerReducer
})

/**
 *  Export the primary redux reducer
 */
export default rootReducer
