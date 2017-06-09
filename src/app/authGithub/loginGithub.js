/**
 * Import node modules
 */
import React, { Component } from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'

/**
 *  Import other dependencies
 */
import {RaisedButton, TextField, MuiThemeProvider} from 'material-ui';
import {orange600, orange500} from 'material-ui/styles/colors';
import styles from './styles.scss'
import * as actions from './actions'

const style = {
  orange: {
   borderColor: orange600,
  }
};

class GithubLogin extends Component {

  handleGithubLoginAttempt() {
    this.props.authenticateUser()
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div className="login-card">
            <div className="form-card">
                <img src="/images/GitHub-Mark-Light-120px-plus.png" className="img-logo" />
                <br/>
                <RaisedButton
                  label="Login with Github"
                  backgroundColor={orange500}
                  className="btn-login"
                  onClick= {() => this.handleGithubLoginAttempt()}
                  />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

/**
 *  Define the PropTypes
 */
GithubLogin.propTypes = {
  authenticateUser: func.isRequired
}

/**
 *  Export the component
 */
export default connect(null, actions)(GithubLogin)
