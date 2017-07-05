/**
 *  Import node modules
 */
import { normalize, schema } from 'normalizr';

/**
 *  Base URL for all API requests
 */
const config = require('config').default
export const API_BASE_URL = config.API_BASE_URL
export const PUSHER_KEY = config.PUSHER_KEY

/**
 *  Pull token out of local storate for requests
 */
export const TOKEN = () => localStorage.getItem('token');
