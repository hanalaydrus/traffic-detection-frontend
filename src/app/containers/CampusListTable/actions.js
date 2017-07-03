import {
  refactoryAxios
} from '../../../helpers';

import {
  UPDATE_IS_FETCHING_CAMPUSES,
  FETCH_CAMPUSES_DATA,
  SUBMIT_DATA_CAMPUSES,
  IS_UPDATE_DATA_CAMPUSES,
  DELETE_DATA_CAMPUSES,
  UPDATE_DATA_CAMPUSES
} from './constants';

import { TOKEN } from '../../../constants';

export function updateIsFetchingCampuses(status) {
  return {
    type: UPDATE_IS_FETCHING_CAMPUSES,
    status
  };
}
export function fetchCampusesData() {
 return (dispatch) => {
   // Set fetching to true
   dispatch(updateIsFetchingCampuses(true));
   // Make the request for contacts
   refactoryAxios.get('/api/campuses', {
     headers: {
       Accept: 'aplication/json',
       Authorization: `Bearer ${TOKEN()}`
    }
   }).then( (response) => {
     // Load the timeline data data into the reducer
     dispatch({
       type: FETCH_CAMPUSES_DATA,
       payload: response.data.data
     });
     // Set fetching to false
     dispatch(updateIsFetchingCampuses(false));
   });
 };
}
export function submitCampusesData (name, address, city_id, phone, description) {
  return (dispatch, getState) => {
    refactoryAxios.post('/api/campuses', ({
        name, address, city_id, phone, description
    }), {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${TOKEN()}`
      }
    }).then((response) => {
      dispatch({
        type: SUBMIT_DATA_CAMPUSES,
        payload: response.data.data
      });
    }).catch(err => err);
  };
}
export function updateCampusesData (id, name, address, city_id, phone, description) {
  return (dispatch, getState) => {
    refactoryAxios.patch(`/api/campuses/${id}`, ({
        name, address, city_id, phone, description
    }), {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${TOKEN()}`
      }
    }).then((response) => {
      dispatch({
        type: UPDATE_DATA_CAMPUSES,
        payload: response.data.data
      });
    }).catch(err => err);
  };
}
export function deleteCampusesData (id) {
  return (dispatch, getState) => {
    refactoryAxios.delete(`/api/campuses/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${TOKEN()}`
      }
    }).then((response) => {
      dispatch({
        type: DELETE_DATA_CAMPUSES,
        payload: response.data.data
      });
    }).catch(err => err);
  };
}
