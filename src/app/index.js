import React from "react";
import ReactDom from "react-dom";

import { BrowserRouter as Router, Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import { Header } from "./components/Header";
import Profile from "./components/Profile";

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

//Import Routes
import Login from './auth/login'


const history = createBrowserHistory()

class App extends React.Component{
  render(){
    return(
      <Router history={history}>
        <div>
            <Route exact path="/" component={Login} />
            <Route path="/profile" component={Profile} />
        </div>
      </Router>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
