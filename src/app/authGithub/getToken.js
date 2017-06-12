import React, { Component } from 'react'
import axios from 'axios'
import {
  ENDPOINT,
  REDIRECT_URI,
  CLIENT_ID,
  CLIENT_SECRET,
  PAYLOADS,
  CLIENT_ASSERTION_TYPE,
  GRANT_TYPE
} from './constants'

import { browserHistory } from 'react-router'
import { setHtmlStorage, removeHtmlStorage } from '../../helpers'
import { authenticateUser } from './actions'

const jwt = require('jsonwebtoken')
const https = require('https')
const Querystring = require('querystring')

export default class getToken extends Component {

  componentDidMount() {
    this.closeWindow()
  }

  closeWindow() {
    if(window.opener.receivedCode) {
      window.opener.receivedCode(window.location.href)
    }
      window.close()
  }

  render() {
    return(
      <div>
      </div>
    )
  }
}
