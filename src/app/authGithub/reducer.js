/**
 *  Import action creator constants
 */
import { fromJS } from 'immutable';
import {
  AUTH_USER,
  UNAUTH_USER,
  LOAD_USER
} from './constants';

/**
 *  Set intial state
 */
const initialState = fromJS({
  isUserLoggedIn: false,
  user: {}
});

/**
 *  Define the reducer with actions
 */
function appReducer(state = initialState, action) {
  switch (action.type) {

    // Set logged in to true
    case AUTH_USER:
      return state.set('isUserLoggedIn', true);

    // Set logged in to false
    case UNAUTH_USER:
      return state.set('isUserLoggedIn', false);

    // Load the user
    case LOAD_USER:
      return state.set('user', fromJS(action.user));

    // Return default state
    default:
      return state;
  }
}

/**
 *  Export the reducer
 */
export default appReducer;
