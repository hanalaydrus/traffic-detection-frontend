import { fromJS } from 'immutable';
import normalize from 'jsonapi-normalizer';
import {
  UPDATE_IS_FETCHING_STUDENT,
  FETCH_STUDENT_DATA,
  UPDATE_DATA_STUDENT,
  FETCH_BATCH_DATA,
  UPDATE_IS_FETCHING_BATCH
} from './constants';

const initialState = fromJS({
  isFetchingStudent: false,
  studentData: [],
  isFetchingBatch: false,
  batchData: [],
  updateStudent: {}
});

function studentDataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STUDENT_DATA:
      return state.set('studentData', fromJS(action.payload));
    case UPDATE_IS_FETCHING_STUDENT:
      return state.set('isFetchingStudent', action.status);
    case FETCH_BATCH_DATA:
      return state.set('batchData', fromJS(action.payload));
    case UPDATE_IS_FETCHING_BATCH:
      return state.set('isFetchingBatch', action.status);
    case UPDATE_DATA_STUDENT:
      return state.set('updateStudent', action.status);
    default:
      return state;
  }
}

export default studentDataReducer;
