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
export const getProfileData = () => createSelector(
  selectTicketData(),
  (state) => state.get('profileData').toJS()
)

/**
 *  Selects the new reminder to create
 *  Returns object
 */
export const getIsFetching = () => createSelector(
  selectTicketData(),
  (state) => state.get('isFetching')
)
export const getIsFetchingProfile = () => createSelector(
  selectTicketData(),
  (state) => state.get('isFetchingProfile')
)


export const getFilters = () => createSelector(
  selectTicketData(),
  (state) => state.get('filters').toJS()
)

export const getIsFetchingComment = () => createSelector(
  selectTicketData(),
  (state) => state.get('isFetchingComment')
)

export const getIsPatchingTicketData = () => createSelector(
  selectTicketData(),
  (state) => state.get('isPatchingTicketData')
)

export const getCommentData = () => createSelector(
  selectTicketData(),
  (state) => state.get('commentData').toJS()
)
