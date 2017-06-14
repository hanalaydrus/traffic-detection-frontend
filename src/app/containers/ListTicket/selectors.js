/**
 *  Import node modules
 */
import { createSelector } from 'reselect';

/**
 *  Select the app/general portion of the root reducer
 */
export const selectTicketData = () => (state) => state.get('ticketData');


export const getTicketData = () => createSelector(
  selectTicketData(),
  (state) => state.get('data').toJS()
);

/**
 *  Selects the new reminder to create
 *  Returns object
 */
export const getIsFetching = () => createSelector(
  selectTicketData(),
  (state) => state.get('isFetching')
);

export const getFilterTodo = () => createSelector(
  selectTicketData(),
  (state) => state.get('todos').toJS()
)

export const getFilterInprogress = () => createSelector(
  selectTicketData(),
  (state) => state.get('inprogresses').toJS()
)

export const getFilterDone = () => createSelector(
  selectTicketData(),
  (state) => state.get('dones').toJS()
)

export const getFilters = () => createSelector(
  selectTicketData(),
  (state) => state.get('filters').toJS()
)
