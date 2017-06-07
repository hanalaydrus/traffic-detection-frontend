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

class App extends React.Component{
  render(){
    return(
      <MuiThemeProvider>
        <Router history={history}>
          <div>
              <Route exact path="/" component={Login} />
              // put other route here
              // <Route path="/profile" component={Profile} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
