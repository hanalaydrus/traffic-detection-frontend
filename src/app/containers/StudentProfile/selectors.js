/**
 *  Import node modules
 */
import { createSelector } from 'reselect';

/**
 *  Select the app/general portion of the root reducer
 */
export const selectStudentData = () => (state) => state.get('studentData')

export const getStudentData = () => createSelector(
  selectStudentData(),
  (state) => state.get('studentData').toJS()
)
export const getIsFetchingStudent = () => createSelector(
  selectStudentData(),
  (state) => state.get('isFetchingStudent')
)
export const getBatchData = () => createSelector(
  selectStudentData(),
  (state) => state.get('batchData').toJS()
)
export const getIsFetchingBatch = () => createSelector(
  selectStudentData(),
  (state) => state.get('isFetchingBatch')
)
export const getUpdateStudent = () => createSelector(
  selectStudentData(),
  (state) => state.get('isFetchingBatch')
)
