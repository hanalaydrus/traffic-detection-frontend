import React, { Component } from 'react';
import {RaisedButton, TextField, MuiThemeProvider} from 'material-ui';
import {orange600, orange500} from 'material-ui/styles/colors';
import "./styles.scss";


const style = {
  orange: {
   borderColor: orange600,
  }
};



class Login extends Component {
  componentWillMount(){
    document.body.style.backgroundColor = "#1a1a1a";
  }
  componentWillUnmount(){
      document.body.style.backgroundColor = null;
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div className="login-card">
            <img src="/images/Refactory.png" className="img-logo" />
            <div className="form-card">
                <TextField
                  className="form-login"
                  floatingLabelText="Email"
                  underlineFocusStyle={style.orange}
                  fullWidth={true}
                />
                <TextField
                  className="form-login"
                  floatingLabelText="Password"
                  underlineFocusStyle={style.orange}
                  type="password"
                  fullWidth={true}
                />
                <RaisedButton label="sign in" backgroundColor={orange500} className="btn-login" />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Login;
