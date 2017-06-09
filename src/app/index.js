import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom'
//redux related
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import ReduxThunk from 'redux-thunk'
import promise from 'redux-promise'

// Import Browser History
import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory()

//Import Material UI Related
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import { Theme } from './theme.js'

//Import Routes
import { Header } from "./components/Header";
import Login from './auth/login'
import Dashboard from './containers/Dashboard'

// import Hiring from './components/Hiring';
import GithubLogin from './authGithub/loginGithub';

export const createStoreWithMiddleware = applyMiddleware(ReduxThunk,promise)(createStore)
export const store = createStoreWithMiddleware(reducers)

class App extends React.Component{
  render(){
    return(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={Theme}>
        <Router history={history}>
          <div>
              <Route exact path="/" component={Login} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/githublogin" component={GithubLogin} />
          </div>
        </Router>
      </MuiThemeProvider>
    </Provider>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
