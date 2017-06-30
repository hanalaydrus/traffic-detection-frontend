import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// redux related
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import promise from 'redux-promise';

// Import Browser history
import history from './history.js';

// Import Material UI Related
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
import { Theme } from './theme.js';

// Import Routes
import Login from './auth/login';
import Dashboard from './containers/Dashboard';
import Curriculum from './containers/Curriculum';
import WorkTodo from './containers/WorkTodo';
import Preparation from './containers/Preparation';
import Interview from './containers/Interview';
import Hiring from './components/Hiring';
import GithubLogin from './authGithub/loginGithub';
import getToken from './authGithub/getToken';
import ListTicket from './containers/ListTicket';
import StudentDetail from './components/StudentProfile';

import City from './containers/City';


export const createStoreWithMiddleware = applyMiddleware(ReduxThunk, promise)(createStore);
export const store = createStoreWithMiddleware(reducers);
/**
 *  Require authentication dependencies
 */
import RequireAuth from './authGithub/require_auth';
import { AUTH_USER, UNAUTH_USER } from './authGithub/constants';
import { statusHtmlStorage } from '../helpers';

/**
 *  Re-authenticate when the application is reloaded
 */
if (statusHtmlStorage('token')) {
  // If token has returned true, the token exists
  // It will be verified in the App onEnter
  store.dispatch({ type: AUTH_USER });
} else {
  // Otherwise, it does not exist, log them out
  store.dispatch({ type: UNAUTH_USER });
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={Theme}>
          <Router history={history}>
            <div>
              <Route exact path="/" component={RequireAuth(ListTicket)} />
              <Route path="/loginadmin" component={Login} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/curriculum" component={Curriculum} />
              <Route path="/worktodo" component={WorkTodo} />
              <Route path="/interview" component={Interview} />
              <Route path="/hiring" component={Hiring} />
              <Route path="/studentlist" component={StudentDetail} />
              <Route path="/city" component={City} />
              <Route path="/githublogin" component={GithubLogin} />
              <Route path="/github/callback" component={getToken} />
              <Route path="/preparation" component={Preparation} />
              <Route path="/listticket" component={RequireAuth(ListTicket)} />
            </div>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));
