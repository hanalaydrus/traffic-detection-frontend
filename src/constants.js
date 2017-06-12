/**
 *  Import node modules
 */
import { normalize, schema } from 'normalizr'

/**
 *  Base URL for all API requests
 */
const config = require('config').default
export const API_BASE_URL = config.API_BASE_URL

/**
 *  Pull token out of local storate for requests
 */
export const TOKEN = () => {
  return localStorage.getItem('token')
}
