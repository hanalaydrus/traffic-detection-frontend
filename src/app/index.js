import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';
const theme = createMuiTheme();

injectTapEventPlugin();

// export const createStoreWithMiddleware = applyMiddleware(ReduxThunk,promise)(createStore);
// export const store = createStoreWithMiddleware(reducers);

/**
 *  Require authentication dependencies
 */

// import { statusHtmlStorage } from '../helpers';

class App extends React.Component {
  render() {
    return(
    // <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router history={history}>
          <div style={{backgroundColor:'#f1f1f1'}}>
            <Route exact path="/" component={Main}/>
          </div>
        </Router>
      </MuiThemeProvider>
    // </Provider>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));
