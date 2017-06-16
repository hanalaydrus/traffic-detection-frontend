/**
 * Import node modules
 */
import React, { Component } from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import {TOKEN} from '../../constants'
import Loader from 'react-loader'
/**
 *  Import other dependencies
 */
import {RaisedButton, TextField, MuiThemeProvider} from 'material-ui';
import {orange600, orange500} from 'material-ui/styles/colors';
import styles from './styles.scss'
import * as actions from './actions'
import * as selectors from './selectors'

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
    console.log('Token : ',TOKEN())
    console.log('status:', this.props.isUserLoggedIn)
    return (
      <MuiThemeProvider>
        <div>
          <div className="login-card">
            <div className="form-card">
                <img src="/images/GitHub-Mark-Light-120px-plus.png" className="img-logo" />
                <br/>
                { 
                <RaisedButton
                  label="Login with Github"
                  backgroundColor={orange500}
                  className="btn-login"
                  onClick= {() => this.handleGithubLoginAttempt()}
                  />
                }
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
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  isUserLoggedIn: selectors.getIsUserLoggedIn()
});

/**
 *  Export the component
 */
export default connect(null, actions)(GithubLogin)
