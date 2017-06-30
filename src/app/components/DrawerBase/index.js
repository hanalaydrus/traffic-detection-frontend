import React from 'react';
import { AppBar } from 'material-ui';
import { orange600, orange500 } from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { DrawerMenu } from './../DrawerMenu';
import './styles.scss';

export class Drawer extends React.Component {
  render() {
    return (
      <div className={this.props.drawerStyle}>
        <DrawerMenu />
      </div>
    );
  }
}
