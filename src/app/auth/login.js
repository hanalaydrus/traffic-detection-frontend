import React, { Component } from 'react';
import {RaisedButton, MuiThemeProvider} from 'material-ui';

class Login extends Component {
  render() {
    return (
      <MuiThemeProvider>
          <RaisedButton label="Primary" primary={true} />
      </MuiThemeProvider>
    );
  }
}

export default Login;
