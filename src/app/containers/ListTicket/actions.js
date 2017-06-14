import {
  refactoryAxios
} from '../../../helpers'

import {
  FETCH_TICKET_DATA,
  UPDATE_IS_FETCHING,
  UPDATE_NEW_TICKET,
  SET_FILTER,
  FILTER_TICKET
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
    const filters = !hasStored ? oldFilters.concat(filter) : oldFilters.filter((value) => value !== filter);
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

    const data = getState().getIn(
      ["ticketData", "data"]
    )
    console.log('sent data', {
      project_name,
      ticket_number,
      old_status,
      new_status
    });

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
      console.log('update data', newData);
      dispatch({
        type: UPDATE_NEW_TICKET,
        payload: newData
      })
    }).catch(err => console.log('error', err));
  }

}
