import {
  AUTH_USER,
  UNAUTH_USER,
  ENDPOINT_AUTH,
  TOKEN_PARAMS,
  ENDPOINT,
  AUTH_IS_PROCESSING
} from './constants';

import axios from 'axios';
import { setHtmlStorage, removeHtmlStorage } from '../../helpers';

// Import Browser history
import history from '../history.js';

export function logIn() {
  return { type: AUTH_USER };
}
export function logOut() {
  return { type: UNAUTH_USER };
}

export function authIsProcessing(status) {
  return {
    type: AUTH_IS_PROCESSING,
    status
  };
}

export function authenticateUser() {
  return (dispatch) => {
    // build github url to request code
    const url = buildUrl(ENDPOINT_AUTH, TOKEN_PARAMS);
    // open new window to open the url
    const childWindow = window.open(url, 'Login with Github', 'width=800,height=300');
    // github will send the code, included in the url as a parameter
    window.receivedCode = (url) => {
      requestToken(getParameterByName('code', url))
        .then((resp) => {
          childWindow.close();
          dispatch(logIn());
            // Save JWT token to localStorage and set expiration
            setHtmlStorage('token', resp.data.access_token, resp.data.expires_in);
            // Redirect using react router
            history.push('/student/listticket');
            location.href = location.href;
      });
    }
  };
}

export function unauthenticateUser() {
  return (dispatch) => {
    dispatch(logOut());
            // Save JWT token to localStorage and set expiration
    removeHtmlStorage('token');
            // Redirect using react router
            history.push('/');
            location.href = location.href;
  };
}

function buildUrl(endPoint, params) {
  return `${endPoint}?${encodeQueryData(params)}`;
}

function encodeQueryData(data) {
  const ret = [];
  for (const d in data) { ret.push(`${encodeURIComponent(d)}=${encodeURIComponent(data[d])}`); }
  return ret.join('&');
}

function getParameterByName(name, url) {
  name = name.replace(/[\[\]]/g, '\\$&');
  let regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);

  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function requestToken(code) {
  const config = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json' }
  };
  const params_token = {
    code: code
  };
  const accessToken = axios.post(ENDPOINT, params_token);
  return accessToken;
}
