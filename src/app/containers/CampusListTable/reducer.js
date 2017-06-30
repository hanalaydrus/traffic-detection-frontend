import { fromJS } from 'immutable';
import normalize from 'jsonapi-normalizer';
import {
  UPDATE_IS_FETCHING_CAMPUSES,
  FETCH_CAMPUSES_DATA,
  SUBMIT_DATA_CAMPUSES,
  IS_UPDATE_DATA_CAMPUSES,
  DELETE_DATA_CAMPUSES,
  UPDATE_DATA_CAMPUSES
} from './constants';

const initialState = fromJS({
  isFetchingCampuses: false,
  campusesData: [],
  submitCampuses: {},
  deleteCampuses: {},
  updateCampuses: {}
});

function campusesDataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CAMPUSES_DATA:
      return state.set('campusesData', fromJS(action.payload));
    case FETCH_CAMPUSES_DATA:
      return state.set('submitCampuses', fromJS(action.payload));
    case UPDATE_IS_FETCHING_CAMPUSES:
      return state.set('isFetchingCampuses', action.status);
    case DELETE_DATA_CAMPUSES:
      return state.set('deleteCampuses', action.status);
    case UPDATE_DATA_CAMPUSES:
      return state.set('updateCampuses', action.status);
    default:
      return state;
  }
}

export default campusesDataReducer;
