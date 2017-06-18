/**
 * Import node modules
 */
import React, { Component } from 'react'
import { func, bool } from 'prop-types'
import { connect } from 'react-redux'
import {TOKEN} from '../../constants'
import Loader from 'react-loader'
import { createStructuredSelector } from 'reselect'
/**
 *  Import other dependencies
 */
import {RaisedButton, TextField, MuiThemeProvider} from 'material-ui';
import {orange600, orange500} from 'material-ui/styles/colors';
import styles from './styles.scss'
import * as actions from './actions'
import * as selectors from './selectors'
import history from '../history.js'

const style = {
  orange: {
   borderColor: orange600,
  }
};

class GithubLogin extends Component {
  static propTypes = {
    authenticated: bool
  }
  constructor(){
    super()
    this.state= {
      authIsProcessing: false
    }
  }
  componentWillMount() {
    if(this.props.isUserLoggedIn) {
      history.push('/student/listticket')
      location.href = location.href
    }
  }

  // Push to login route if not authenticated on update
  componentWillUpdate(nextProps) {
    if(this.props.isUserLoggedIn) {
      history.push('/student/listticket')
      location.href = location.href
    }
  }
  handleGithubLoginAttempt() {
    this.props.authenticateUser()
    this.setState({
      authIsProcessing: true
    })
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div className="login-card">
            <div className="form-card">
                <img src="/images/GitHub-Mark-Light-120px-plus.png" className="img-logo" />
                <br/>
                { this.state.authIsProcessing ?
                  <div className="loader-login"><Loader type="line-scale" color="#fff" active /></div> :
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
export default connect(mapStateToProps, actions)(GithubLogin)
