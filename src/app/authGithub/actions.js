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
  // CLIENT_ASSERTION_TYPE,
  // GRANT_TYPE
} from './constants';

const https = require('https');
const querystring = require('querystring');

import axios from 'axios';
import {browserHistory} from 'react-router';
import {setHtmlStorage,removeHtmlStorage} from '../../helpers';
const jwt = require('jsonwebtoken');

export function logIn() {
  return { type: AUTH_USER };
}

export function authenticateUser() {
  return dispatch => {
    window.receivedCode = (url) => {
        requestToken(getParameterByName('code',url))
    }

    // const jwtToken = jwt.sign(TOKEN_PARAMS, CLIENT_SECRET);

    const url = buildUrl(ENDPOINT_AUTH, TOKEN_PARAMS);

    const childWindow = window.open(url, 'ddd', 'width=800,height=300');
  }
};

function buildUrl (endPoint, params, token) {
  return `${endPoint}?${encodeQueryData(params)}`;
  // return `${endPoint}?${encodeQueryData(params)}&request=${token}&success=receivedCode`;
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
    client_id:CLIENT_ID,
    client_secret:CLIENT_SECRET,
    code: code,
    redirect_uri: REDIRECT_URI,
  }
  const data = `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`
  console.log(params_token)

  // var request = new XMLHttpRequest();
  // request.onreadystatechange = function() {
  //   if (request.readyState == XMLHttpRequest.DONE) {
  //       console.log(request.responseText);
  //   }
  // }
  // request.open('POST', ENDPOINT, true);
  // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  // request.setRequestHeader('Accept', 'application/json');
  // request.send(data);

  axios.post(ENDPOINT, querystring.stringify(params_token), config)
  .then((response) => {
    console.log(response)
  })
  .catch((response)=>{
    console.log(response)
  })
//   .then((resp) => {
//       // const name = jwt.decode(resp.data.id_token)
//       console.log(resp)
//       dispatch(logIn());
//       // Save JWT token to localStorage and set expiration
//       setHtmlStorage('token', resp.data.access_token, 3600);
//       // Redirect using react router
//       browserHistory.push('/');
//
// });
}
