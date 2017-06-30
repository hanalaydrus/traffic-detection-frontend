import React, { Component } from 'react';
import { RaisedButton, TextField } from 'material-ui';
import { orange600, orange500 } from 'material-ui/styles/colors';
import './styles.scss';
import { TOKEN } from '../../constants';

const style = {
  orange: {
    borderColor: orange600
  }
};

class Login extends Component {
  componentWillMount() {
    document.body.style.backgroundColor = '#1a1a1a';
  }
  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }
  render() {
    return (
      <div>
        <div className="login-card">
          <img
            src="/images/Refactory.png"
            alt="refactory"
            className="img-logo"
          />
          <div className="form-card">
            <TextField
              className="form-login"
              floatingLabelText="Email"
              underlineFocusStyle={style.orange}
              fullWidth
            />
            <TextField
              className="form-login"
              floatingLabelText="Password"
              underlineFocusStyle={style.orange}
              type="password"
              fullWidth
            />
            <RaisedButton label="sign in" backgroundColor={orange500} className="btn-login" />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
