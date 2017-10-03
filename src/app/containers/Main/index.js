import React from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
import PropTypes from 'prop-types';
// import { API_BASE_URL, PUSHER_KEY } from '../../../constants'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';

import Videos from '../Videos';

function TabContainer(props) {
  return <div style={{ padding: 20 }}>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
});

export default class Main extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div>
        <AppBar position="static">
            <div style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Tabs value={this.state.value} onChange={this.handleChange} centered>
                <Tab label="Dashboard" />
                <Tab label="Videos" />
                <Tab label="Maps" />
              </Tabs>
            </div>
        </AppBar>
        {this.state.value === 0 && <TabContainer><Videos/></TabContainer>}
        {this.state.value === 1 && <TabContainer><Videos/></TabContainer>}
        {this.state.value === 2 && <TabContainer><Videos/></TabContainer>}
      </div>
    );
  }
}
