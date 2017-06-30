import React, { Component } from 'react';
import { orange600 } from 'material-ui/styles/colors';
import { Header } from './../../components/Header';
import { Drawer } from './../../components/DrawerBase';
import './styles.scss';


const style = {
  orange: {
    borderColor: orange600
  },
  content_full: {
    marginLeft: 0,
    padding: 40,
    paddingTop: 20,
    transition: '1s all ease'
  },
  content_less: {
    marginLeft: 250,
    padding: 40,
    paddingTop: 20,
    transition: '1s all ease'
  }
};

export default class Interview extends Component {
  constructor() {
    super();
    this.state = {
      navStyle: 'nav',
      drawerStyle: 'menu-drawer',
      contentStyle: style.content_less,
      date: 'Monday, 12 June 2107',
      time: '00:00'
    };
  }

  handleChange = (Nav, Draw) => {
    this.setState({ navStyle: Nav });
    this.setState({ drawerStyle: Draw });
    const Const = this.state.contentStyle === style.content_less ? style.content_full : style.content_less;
    this.setState({ contentStyle: Const });
  }

  render() {
    return (
      <div style={{ margin: 0 }}>
        <Header onClick={this.handleChange} navStyle={this.state.navStyle} drawerStyle={this.state.drawerStyle} content={this.state.content}/>
        <Drawer drawerStyle={this.state.drawerStyle} />
        <div className={this.state.contentStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
