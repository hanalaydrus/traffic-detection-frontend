/**
 *  Import node modules
 */
import { combineReducers } from 'redux-immutable';
/**
 *  Import reducers
 *  All reducers used in the app must be declared here!
 */
import AuthReducer from './authGithub/reducer';
import TicketDataReducer from './containers/ListTicket/reducer';
import CityDataReducer from './containers/City/reducer';
import CampusesDataReducer from './containers/CampusListTable/reducer';
import ToogleDrawerReducer from './containers/Template/reducer';
/**
 *  Combine the reducers
 */
const rootReducer = combineReducers({
  authGithub: AuthReducer,
  ticketData: TicketDataReducer,
  toggleDrawer: ToogleDrawerReducer,
  cityData: CityDataReducer,
  campusesData: CampusesDataReducer
});

/**
 *  Export the primary redux reducer
 */
export default rootReducer;
