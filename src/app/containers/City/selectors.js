/**
 *  Import node modules
 */
import { createSelector } from 'reselect';

/**
 *  Select the app/general portion of the root reducer
 */
export const selectCityData = () => (state) => state.get('cityData');

export const getCityData = () => createSelector(
  selectCityData(),
  (state) => state.get('citiesData').toJS()
);


export const getIsFetchingCity = () => createSelector(
  selectCityData(),
  (state) => state.get('isFetchingCity')
);
