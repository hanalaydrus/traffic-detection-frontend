/**
 *  Import node modules
 */
import { createSelector } from 'reselect';

/**
 *  Select the app/general portion of the root reducer
 */
export const selectCampusesData = () => (state) => state.get('campusesData')

export const getCampusesData = () => createSelector(
  selectCampusesData(),
  (state) => state.get('campusesData').toJS()
)
export const getSubmitCampusesData = () => createSelector(
  selectCampusesData(),
  (state) => state.get('submitCampuses').toJS()
)

export const getIsFetchingCampuses = () => createSelector(
  selectCampusesData(),
  (state) => state.get('isFetchingCampuses')
)
export const getDeleteCampuses = () => createSelector(
  selectCampusesData(),
  (state) => state.get('deleteCampuses')
)
export const getUpdateCampuses = () => createSelector(
  selectCampusesData(),
  (state) => state.get('updateCampuses')
)
