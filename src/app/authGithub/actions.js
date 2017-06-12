import {
  AUTH_USER,
  UNAUTH_USER,
  LOAD_USER,
  ENDPOINT_AUTH,
  CLIENT_SECRET,
  TOKEN_PARAMS,
  ENDPOINT,
  REDIRECT_URI,
  CLIENT_ID,
  PAYLOADS

} from './constants';

const https = require('https');
const querystring = require('querystring');

import axios from 'axios';
import {setHtmlStorage,removeHtmlStorage} from '../../helpers';

// Import Browser history
import history from '../history.js'

export function logIn() {
  return { type: AUTH_USER };
}

export function authenticateUser() {
  return dispatch => {
    window.receivedCode = (url) => {
        requestToken(getParameterByName('code',url))
        .then((resp) => {
            dispatch(logIn());
            // Save JWT token to localStorage and set expiration
            setHtmlStorage('token', resp.data.access_token, 3600);
            // Redirect using react router
            history.push('/');
            window.location.reload();
      });
    }

    const url = buildUrl(ENDPOINT_AUTH, TOKEN_PARAMS);

    const childWindow = window.open(url, 'Login with Github', 'width=800,height=300');
  }
};

function buildUrl (endPoint, params) {
  return `${endPoint}?${encodeQueryData(params)}`;
}

function encodeQueryData(data) {
   let ret = [];
   for (let d in data)
     ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
   return ret.join('&');
}

function getParameterByName(name, url) {

  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
  results = regex.exec(url);

  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function requestToken(code) {

  // const token = jwt.sign(PAYLOADS, CLIENT_SECRET);
  const config = {
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Accept':'application/json'}
  }
  const params_token = {
    code: code
  }

  const accessToken = axios.post(ENDPOINT, params_token)
  return accessToken
}