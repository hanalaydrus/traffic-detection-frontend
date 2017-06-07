import React, { Component } from 'react';
import {RaisedButton, TextField} from 'material-ui';
import {orange600, orange500} from 'material-ui/styles/colors';
import {Header} from "./../../components/Header";
import {Drawer} from "./../../components/Drawer";
const style = {
  orange: {
   borderColor: orange600,
 },
  content_full: {
   marginLeft:0,
   transition:'1s all ease',
 },
  content_less: {
   marginLeft:250,
   transition:'1s all ease',
 }
};

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      navStyle: 'nav',
      drawerStyle: 'menu-drawer',
      contentStyle: style.content_less
    }
  }

  handleChange = (Nav, Draw) => {
    this.setState({ navStyle: Nav })
    this.setState({ drawerStyle: Draw })
    const Const = this.state.contentStyle === style.content_less ? style.content_full : style.content_less;
    this.setState({ contentStyle: Const})
  }

  render() {
    return (
        <div style={{margin:0}}>
          <Header onClick={this.handleChange} navStyle={this.state.navStyle} drawerStyle={this.state.drawerStyle} content={this.state.content}/>
          <Drawer drawerStyle={this.state.drawerStyle} />
          <div style={this.state.contentStyle}>
            <h1>Hello World</h1>
          </div>
        </div>
    );
  }
}

export default Dashboard;
