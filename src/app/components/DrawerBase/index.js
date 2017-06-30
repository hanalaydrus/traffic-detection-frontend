import React from 'react';
import { object } from 'prop-types';
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

Drawer.propTypes = {
  drawerStyle: object
};
