import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
const history = createBrowserHistory()

//Import Routes
import { Header } from "./components/Header";
import Login from './auth/login'
import Hiring from './components/Hiring';
import { Theme } from './theme.js'

class App extends React.Component{
  render(){
    return(
      <MuiThemeProvider muiTheme={Theme}>
        <Router history={history}>
          <div>
              <Route exact path="/" component={Login} />
              <Route path="/hiring" component={Hiring} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
