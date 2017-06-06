import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, IndexRoute } from 'react-router-dom'
import {Header} from "./components/Header"
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


//Import Routes
import Login from './auth/login'

class App extends React.Component{
  render(){
    return(
      <Router>
        <div>
          <Route path="/" component={Login} />
        </div>
      </Router>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
