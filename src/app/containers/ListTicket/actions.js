import {
  refactoryAxios
} from '../../../helpers';

import Pusher from 'pusher-js';
import {
  FETCH_TICKET_DATA,
  UPDATE_IS_FETCHING,
  UPDATE_NEW_TICKET,
  SET_FILTER,
  FETCH_COMMENT_DATA,
  UPDATE_IS_FETCHING_COMMENT,
  UPDATE_IS_PATCHING_TICKET_DATA,
  UPDATE_IS_FETCHING_PROFILE,
  UPDATE_COMMENT_DATA,
  FETCH_PROFILE_DATA,
  UPDATE_NEW_SCORE,
  WEBHOOK_PUSHER_KEY,
  NOTIFICATION_SERVICE,
  IS_NEW_NOTIFICATION_DATA,
  IS_SUBSCRIBE_NOTIFICATION
} from './constants'

import { TOKEN, API_BASE_URL, PUSHER_KEY } from '../../../constants'

export function fetchTicketData() {
  return (dispatch) => {
   // Set fetching to true
    dispatch(updateIsFetching(true));
   // Make the request for contacts
    refactoryAxios.get('/api/tickets', {
      headers: {
        Authorization: `Bearer ${TOKEN()}`
      }
    }).then((response) => {
     // Load the timeline data data into the reducer
      dispatch({
        type: FETCH_TICKET_DATA,
        payload: response.data.data
      });
     // Set fetching to false
      dispatch(updateIsFetching(false));
    });
  };
}

export function fetchProfileData() {
 return (dispatch) => {
   // Set fetching to true
   dispatch(updateIsFetchingProfile(true));
   // Make the request for contacts
   refactoryAxios.get('/api/profile', {
     headers: {
       Accept: 'aplication/json',
       Authorization: `Bearer ${TOKEN()}`
    }
   }).then( (response) => {
     // Load the timeline data data into the reducer
     dispatch({
       type: FETCH_PROFILE_DATA,
       payload: response.data.data
     });
     // Set fetching to false
     dispatch(updateIsFetchingProfile(false));
   });
 };
}

export function setFilter(filter) {
  return (dispatch, getState) => {
    const oldFilters = getState().getIn([ 'ticketData', 'filters' ]).toJS();
    const hasStored = oldFilters.findIndex((status) => filter === status) >= 0;
    const filters = !hasStored ? (
        (filter === 'todo') ? (oldFilters.concat(filter, 'inprogress')) : oldFilters.concat(filter)
      ) :
      (
        (filter === 'todo') ? (oldFilters.filter(value => (value !== filter) && (value !== 'inprogress'))) : oldFilters.filter(value => value !== filter)
      );
    dispatch({
      type: SET_FILTER,
      filters
    });
  };
}


export function updateIsFetching(status) {
  return {
    type: UPDATE_IS_FETCHING,
    status
  };
}

export function updateIsFetchingProfile(status) {
  return {
    type: UPDATE_IS_FETCHING_PROFILE,
    status
  };
}

export function patchTicketData (project_name, ticket_number, old_status, new_status, newData) {
  return (dispatch, getState) => {
    dispatch(updateIsPatchingTicketData(true));
    refactoryAxios.patch('/api/tickets/status', {
      project_name,
      ticket_number,
      old_status,
      new_status
    }, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${TOKEN()}`
      }
    }).then((response) => {
      if (new_status === 'done' || old_status === 'done') {
        dispatch(fetchScoreData(newData));
      } else {
        dispatch(updateIsPatchingTicketData(false));
      }
      dispatch({
          type: UPDATE_NEW_TICKET,
          payload: newData
        });
    }).catch(err => err);
  };
}

export function fetchScoreData(newData) {
 return (dispatch) => {
   // Make the request for scores
   refactoryAxios.get('/api/tickets/score', {
     headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${TOKEN()}`
      }
   }).then( (response) => {
     // Load the score data into the reducer
     newData.total_score = response.data.data.total_score;
     dispatch({
       type: UPDATE_NEW_SCORE,
       payload: newData
     });
    //  Set fetching to false
     dispatch(updateIsPatchingTicketData(false));
   });
 };
}

export function updateIsPatchingTicketData(status) {
  return {
    type: UPDATE_IS_PATCHING_TICKET_DATA,
    status
  };
}

export function updateIsFetchingComment(status) {
  return {
    type: UPDATE_IS_FETCHING_COMMENT,
    status
  };
}

export function fetchCommentData(projectName, ticketNumber) {
  return (dispatch) => {
   // Set fetching to true
    dispatch(updateIsFetchingComment(true));
   // Make the request for contacts
    refactoryAxios.get(`/api/tickets/${projectName}/${ticketNumber}`, {
      headers: {
        Authorization: `Bearer ${TOKEN()}`,
        Accept: 'application/json'
      }
    }).then((response) => {
     // Load the timeline data data into the reducer
      dispatch({
        type: FETCH_COMMENT_DATA,
        payload: response.data.data
      });
     // Set fetching to false
      dispatch(updateIsFetchingComment(false));
    });
  };
}

export function submitCommentData(projectName, ticketNumber, body) {
  return (dispatch) => {
    refactoryAxios.post(`/api/tickets/${projectName}/${ticketNumber}/comment`, {
      body
    }, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${TOKEN()}`
      }
    }).then((response) => {
      dispatch({
        type: UPDATE_COMMENT_DATA,
        payload: response.data.data
      });
    }).catch(err => err);
  };
}

export function notificationService (profile) {
  return (dispatch, getState) => {
    //for debug only. must disabled on production
    // Pusher.logToConsole = true;

    var pusher = new Pusher(PUSHER_KEY, {
      authEndpoint: API_BASE_URL +'api/pusher/auth',
      encrypted: true
    });

    var channel = pusher.subscribe('private-user.'+ profile.id);

    channel.bind('Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', function(data) {
      dispatch(setNotificationService(data))
      dispatch(updateIsNewNotificationData(true))
    });
    dispatch(setSubscribeNotification(true))
  }
}

export function setNotificationService(payload){
  return {type: NOTIFICATION_SERVICE, payload}
}

export function setSubscribeNotification(status) {
  return { type: IS_SUBSCRIBE_NOTIFICATION, status }
}

export function updateIsNewNotificationData(status) {
  return {
    type: IS_NEW_NOTIFICATION_DATA,
    status
  }
}
