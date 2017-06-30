import {
  AUTH_USER,
  UNAUTH_USER,
  LOAD_USER,
  ENDPOINT_AUTH,
  CLIENT_SECRET,
  TOKEN_PARAMS,
  ENDPOINT,
  CLIENT_ID
} from './constants';

const https = require('https');
const querystring = require('querystring');

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
    window.receivedCode = (url) => {
      requestToken(getParameterByName('code', url))
        .then((resp) => {
          dispatch(logIn());
            // Save JWT token to localStorage and set expiration
          setHtmlStorage('token', resp.data.access_token, 3600);
            // Redirect using react router
          history.push('/listticket');
          window.location.reload();
        });
    };

    const url = buildUrl(ENDPOINT_AUTH, TOKEN_PARAMS);

    const childWindow = window.open(url, 'Login with Github', 'width=800,height=300');
  };
}

export function unauthenticateUser() {
  return (dispatch) => {
    dispatch(logOut());
            // Save JWT token to localStorage and set expiration
    removeHtmlStorage('token');
            // Redirect using react router
    history.push('/');
    window.location.reload();
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
    code
  };

  const accessToken = axios.post(ENDPOINT, params_token);
  return accessToken;
}
