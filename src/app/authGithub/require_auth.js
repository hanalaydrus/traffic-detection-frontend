/**
 *  Import node modules
 */
import React, { Component } from 'react';
import { bool, object } from 'prop-types';
import { connect } from 'react-redux';

/**
 *  Import other dependencies
 */
import { getIsUserLoggedIn } from './selectors';

// Import Browser history
import history from '../history.js';

/**
 *  Define the higher order component
 */
export default function (ComposedComponent) {
  class Authentication extends Component {

    // Set context for programatically changing route
    static contextTypes = {
      router: object
    }

    // Define propTypes
    static propTypes = {
      authenticated: bool
    }

    // Push to login route if not authenticated on mount
    componentWillMount() {
      if(!this.props.authenticated) {
        history.push('/githublogin');
        location.href = location.href;
      }
    }

    // Push to login route if not authenticated on update
    componentWillUpdate(nextProps) {
      if(!this.props.authenticated) {
        history.push('/githublogin');
        location.href = location.href;
      }
    }

    // Otherwise render everything that's there
    render() {
      return <ComposedComponent {...this.props} />;
    }

  }

  // Get logged in status
  function mapStateToProps(state) {
    return {
      authenticated: state.get('authGithub').get('isUserLoggedIn')
    };
  }

  // Return the component connected to redux
  return connect(mapStateToProps)(Authentication);
}
