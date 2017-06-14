import {createSelector} from 'reselect'

export const selectToggleDrawerReducer = () => (state) =>
state.get('toggleDrawer')

export const getToggleDrawer = () => createSelector(
  selectToggleDrawerReducer(),
  (state) => state.get('className')
)

export const getToogleSidebar = () => createSelector(
  selectToggleDrawerReducer(),
  (state) => state.get('classNameSidebar')
)
