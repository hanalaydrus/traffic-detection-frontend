import { fromJS } from 'immutable';
import normalize from 'jsonapi-normalizer'
import {
  UPDATE_IS_FETCHING_CITY,
  FETCH_CITY_DATA,
} from './constants'

const initialState = fromJS({
  isFetchingCity: false,
  citiesData: []
})

function cityDataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CITY_DATA:
      return state.set('citiesData', fromJS(action.payload))
    case UPDATE_IS_FETCHING_CITY:
      return state.set('isFetchingCity', action.status)
    default:
      return state
  }
}

export default cityDataReducer
