import {
  refactoryAxios
} from '../../../helpers';

import {
  UPDATE_IS_FETCHING_STUDENT,
  FETCH_STUDENT_DATA,
  UPDATE_DATA_STUDENT,
  FETCH_BATCH_DATA,
  UPDATE_IS_FETCHING_BATCH
} from './constants';

import { TOKEN } from '../../../constants';

export function updateIsFetchingStudent(status) {
  return {
    type: UPDATE_IS_FETCHING_STUDENT,
    status
  };
}
export function updateIsFetchingBacth(status) {
  return {
    type: UPDATE_IS_FETCHING_BATCH,
    status
  };
}
export function fetchStudentData(idParticipant, idStudent) {
 return (dispatch) => {
   // Set fetching to true
   dispatch(updateIsFetchingStudent(true));
   // Make the request for contacts
   refactoryAxios.get(`/api/liststudent/${idParticipant}/${idStudent}`, {
     headers: {
       Accept: 'aplication/json',
       Authorization: `Bearer ${TOKEN()}`
    }
   }).then( (response) => {
     // Load the timeline data data into the reducer
     dispatch({
       type: FETCH_STUDENT_DATA,
       payload: response.data.data
     });
     // Set fetching to false
     dispatch(updateIsFetchingStudent(false));
   });
 };
}
export function fetchBatchData(idCampus) {
 return (dispatch) => {
   // Set fetching to true
   dispatch(updateIsFetchingBacth(true));
   // Make the request for contacts
   refactoryAxios.get(`/api/batch/${idCampus}`, {
     headers: {
       Accept: 'aplication/json',
       Authorization: `Bearer ${TOKEN()}`
    }
   }).then( (response) => {
     // Load the timeline data data into the reducer
     dispatch({
       type: FETCH_BATCH_DATA,
       payload: response.data.data
     });
     // Set fetching to false
     dispatch(updateIsFetchingBacth(false));
   });
 };
}

export function updateStudentData (idParticipant, idStudent, full_name, batch_id, birthday, address, email, status) {
  return (dispatch, getState) => {
    refactoryAxios.patch(`/api/liststudent/${idParticipant}/${idStudent}`, ({
      full_name, batch_id, birthday, address, email, status
    }), {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${TOKEN()}`
      }
    }).then((response) => {
      dispatch({
        type: UPDATE_DATA_STUDENT,
        payload: response.data.data
      });
    }).catch(err => err);
  };
}
