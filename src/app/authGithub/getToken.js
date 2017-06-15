import React, { Component } from 'react'
import { setHtmlStorage, removeHtmlStorage } from '../../helpers'

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
