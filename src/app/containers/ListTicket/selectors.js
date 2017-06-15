/**
 *  Import node modules
 */
import { createSelector } from 'reselect';

/**
 *  Select the app/general portion of the root reducer
 */
export const selectTicketData = () => (state) => state.get('ticketData')


export const getTicketData = () => createSelector(
  selectTicketData(),
  (state) => state.get('data').toJS()
)

/**
 *  Selects the new reminder to create
 *  Returns object
 */
export const getIsFetching = () => createSelector(
  selectTicketData(),
  (state) => state.get('isFetching')
)

export const getFilters = () => createSelector(
  selectTicketData(),
  (state) => state.get('filters').toJS()
)

export const getIsFetchingComment = () => createSelector(
  selectTicketData(),
  (state) => state.get('isFetchingComment')
)

export const getCommentData = () => createSelector(
  selectTicketData(),
  (state) => state.get('commentData').toJS()
)
