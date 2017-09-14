import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
//redux related
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import promise from 'redux-promise';

// Import Browser history
import history from './history.js';

// Import routes
import Main from './containers/Main';

// Import Material UI Related
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

export const createStoreWithMiddleware = applyMiddleware(ReduxThunk,promise)(createStore);
export const store = createStoreWithMiddleware(reducers);

/**
 *  Require authentication dependencies
 */

import { statusHtmlStorage } from '../helpers';

class App extends React.Component {
  render() {
    return(
    <Provider store={store}>
      <MuiThemeProvider>
        <Router history={history}>
          <div>
            <Route exact path="/" component={Main}/>
          </div>
        </Router>
      </MuiThemeProvider>
    </Provider>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));
