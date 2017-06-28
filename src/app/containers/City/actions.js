import {
  refactoryAxios
} from '../../../helpers'

import {
  UPDATE_IS_FETCHING_CITY,
  FETCH_CITY_DATA,
} from './constants'

import { TOKEN } from '../../../constants'

export function fetchCityData() {
 return (dispatch) => {
   // Set fetching to true
   dispatch(updateIsFetchingCity(true))
   // Make the request for contacts
   refactoryAxios.get(`/api/city`, {
     headers: {
       Accept: "aplication/json",
       Authorization: `Bearer ${TOKEN()}`
    }
   }).then( (response) => {
     // Load the timeline data data into the reducer
     dispatch({
       type: FETCH_CITY_DATA,
       payload: response.data.data
     })
     // Set fetching to false
     dispatch(updateIsFetchingCity(false))
   })
 }
}
export function updateIsFetchingCity(status) {
  return {
    type: UPDATE_IS_FETCHING_CITY,
    status
  }
}
