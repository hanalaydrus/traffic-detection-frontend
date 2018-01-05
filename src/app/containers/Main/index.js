import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

import Dashboard from '../Dashboard';
import Cameras from '../Cameras';
import Maps from '../Maps';

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
                <Tab label="Cameras" />
                <Tab label="Maps" />
              </Tabs>
            </div>
        </AppBar>
        {this.state.value === 0 && <TabContainer><Dashboard/></TabContainer>}
        {this.state.value === 1 && <TabContainer><Cameras/></TabContainer>}
        {this.state.value === 2 && <TabContainer><Maps/></TabContainer>}
      </div>
    );
  }
}
