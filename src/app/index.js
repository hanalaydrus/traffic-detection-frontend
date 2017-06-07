import React from "react";
import ReactDom from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { Header } from "./components/Header";

import Login from './auth/login'
import Hiring from './components/Hiring';

const history = createBrowserHistory()

class App extends React.Component{
  render(){
    return(
      <MuiThemeProvider>
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
