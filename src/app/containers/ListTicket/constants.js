
/**
 *  Import configuration
 */
const config = require('config')
const { PUSHER_KEY } = config.default

/**
*  Define Constants
*/
export const FETCH_TICKET_DATA = 'src/app/containers/ListTicket/FETCH_TICKET_DATA'
export const FETCH_PROFILE_DATA = 'src/app/containers/ListTicket/FETCH_PROFILE_DATA'
export const UPDATE_IS_FETCHING = 'src/app/containers/ListTicket/UPDATE_IS_FETCHING'
export const UPDATE_IS_FETCHING_PROFILE = 'src/app/containers/ListTicket/UPDATE_IS_FETCHING_PROFILE'
export const UPDATE_NEW_TICKET = 'src/app/containers/ListTicket/UPDATE_NEW_TICKET'
export const UPDATE_NEW_SCORE = 'src/app/containers/ListTicket/UPDATE_NEW_SCORE'
export const FILTER_TICKET = 'src/app/containers/ListTicket/FILTER_TICKET'
export const SET_FILTER = 'src/app/containers/ListTicket/SET_FILTER'
export const FETCH_COMMENT_DATA = 'src/app/containers/ListTicket/FETCH_COMMENT_DATA'
export const UPDATE_IS_FETCHING_COMMENT = 'src/app/containers/ListTicket/UPDATE_IS_FETCHING_COMMENT'
export const UPDATE_COMMENT_DATA = 'src/app/containers/ListTicket/UPDATE_COMMENT_DATA'
export const UPDATE_IS_PATCHING_TICKET_DATA = 'src/app/containers/ListTicket/UPDATE_IS_PATCHING_TICKET_DATA'
export const WEBHOOK_PUSHER_KEY = 'src/app/containers/ListTicket/WEBHOOK_PUSHER_KEY'
export const NOTIFICATION_SERVICE = 'src/app/containers/ListTicket/NOTIFICATION_SERVICE'
export const IS_NEW_NOTIFICATION_DATA = 'src/app/containers/ListTicket/IS_NEW_NOTIFICATION_DATA'
export const IS_SUBSCRIBE_NOTIFICATION = 'src/app/containers/ListTicket/IS_SUBSCRIBE_NOTIFICATION'
