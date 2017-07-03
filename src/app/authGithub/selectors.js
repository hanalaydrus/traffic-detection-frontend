/**
 *  Import node modules
 */
import { createSelector } from 'reselect';

/**
 *  Select the person portion of the root reducer
 */
export const selectAuthReducer = () => state => state.get('authGithub');

/**
 *  Selects the logged in status of the user
 *  Returns boolean
 */
export const getIsUserLoggedIn = () => createSelector(
  selectAuthReducer(),
  state => state.get('isUserLoggedIn')
);

/**
 *  Selects the details of the currently logged in user
 *  Returns object
 */
export const getUser = () => createSelector(
  selectAuthReducer(),
  state => state.get('user').toJS()
);
