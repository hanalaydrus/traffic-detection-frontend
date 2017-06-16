import {
  refactoryAxios
} from '../../../helpers'

import {
  FETCH_TICKET_DATA,
  UPDATE_IS_FETCHING,
  UPDATE_NEW_TICKET,
  SET_FILTER,
  FILTER_TICKET,
  FETCH_COMMENT_DATA,
  UPDATE_IS_FETCHING_COMMENT,
  UPDATE_COMMENT_DATA
} from './constants'

import { TOKEN } from '../../../constants'

export function fetchTicketData() {
 return (dispatch) => {
   // Set fetching to true
   dispatch(updateIsFetching(true))
   // Make the request for contacts
   refactoryAxios.get(`/api/tickets`, {
     headers: {
       Authorization: `Bearer ${TOKEN()}`
    }
   }).then( (response) => {
     // Load the timeline data data into the reducer
     dispatch({
       type: FETCH_TICKET_DATA,
       payload: response.data.data
     })
     // Set fetching to false
     dispatch(updateIsFetching(false))
   })
 }
}

export function setFilter(filter) {
  return (dispatch, getState) => {  
    const oldFilters = getState().getIn(['ticketData', 'filters']).toJS();
    const hasStored = oldFilters.findIndex((status) => filter === status) >= 0;
    const filters = !hasStored ? (
        (filter === 'todo') ? (oldFilters.concat(filter, 'inprogress')) : oldFilters.concat(filter)
      ) : 
      (
        (filter === 'todo') ? (oldFilters.filter((value) => (value !== filter) && (value !== 'inprogress'))) : oldFilters.filter((value) => value !== filter)
      );
    console.log('oldFilters', oldFilters, 'filters', filters)
    dispatch({
      type: SET_FILTER,
      filters
    })
  }
}


export function updateIsFetching(status) {
  return {
    type: UPDATE_IS_FETCHING,
    status
  }
}

export function patchTicketData (project_name, ticket_number, old_status, new_status, newData) {
  return (dispatch, getState) => {

    refactoryAxios.patch('/api/tickets/status', {
      project_name,
      ticket_number,
      old_status,
      new_status
    }, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${TOKEN()}`
      }
    }).then((response) => {
      dispatch({
        type: UPDATE_NEW_TICKET,
        payload: newData
      })
    }).catch(err => console.log('error', err));
  }
}

export function updateIsFetchingComment(status) {
  return {
    type: UPDATE_IS_FETCHING_COMMENT,
    status
  }
}

export function fetchCommentData(projectName,ticketNumber) {
 return (dispatch) => {
   // Set fetching to true
   dispatch(updateIsFetchingComment(true))
   // Make the request for contacts
   refactoryAxios.get(`/api/tickets/${projectName}/${ticketNumber}`, {
     headers: {
       Authorization: `Bearer ${TOKEN()}`,
       Accept : 'application/json'
    }
   }).then( (response) => {
     // Load the timeline data data into the reducer
     dispatch({
       type: FETCH_COMMENT_DATA,
       payload: response.data.data
     })
     // Set fetching to false
     dispatch(updateIsFetchingComment(false))
   })
 }
}

export function submitCommentData (projectName, ticketNumber, body) {
  return (dispatch, getState) => {

    refactoryAxios.post(`/api/tickets/${projectName}/${ticketNumber}/comment`, {
      body
    }, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${TOKEN()}`
      }
    }).then((response) => {
      console.log('response comment', response.data)
      dispatch({
        type: UPDATE_COMMENT_DATA,
        payload: response.data.data
      })
    }).catch(err => console.log('error', err));
  }
}