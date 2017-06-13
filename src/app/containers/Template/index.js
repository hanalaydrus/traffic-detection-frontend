import React, { Component } from 'react';
import {RaisedButton, TextField} from 'material-ui';
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {bindActionCreators} from "redux";

import {orange600, orange500} from 'material-ui/styles/colors';
import {Header} from "./../../components/Header";
import {Drawer} from "./../../components/Drawer";

import * as actions from './actions'
import * as selectors from './selectors'


const style = {
  orange: {
   borderColor: orange600,
 },
  content_full: {
   marginLeft:0,
   padding:40,
   paddingTop:20,
   transition:'1s all ease',
 },
  content_less: {
   marginLeft:250,
   padding:40,
   paddingTop:20,
   transition:'1s all ease',
 }
};

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      contentStyle: style.content_less
    }
  }

  handleChange = (Nav, Draw) => {
    const { toggleDrawer, toggleSidebar } = this.props
    toggleDrawer(Nav)
    toggleSidebar(Draw)
    // this.setState({ navStyle: Nav })
    // this.setState({ drawerStyle: Draw })
    const Const = this.state.contentStyle === style.content_less ? style.content_full : style.content_less;
    this.setState({ contentStyle: Const})
  }

  render() {
    const { toggleDrawerData,toggleDrawerSidebarData } = this.props
    return (
        <div style={{margin:0}}>
          <Header onClick={this.handleChange} navStyle={toggleDrawerData} drawerStyle={toggleDrawerSidebarData} content={this.state.content}/>
          <Drawer drawerStyle={toggleDrawerSidebarData} />
          <div style={this.state.contentStyle}>
            <h1>Hello World</h1>
          </div>
        </div>
    );
  }
}

/* Binding actions dari lain
  function mapDispatchToProps(dispatch){
  /return bindActionCreators({
    ...actions,

  })
}*/

const mapStateToProps = createStructuredSelector({
  toggleDrawerData: selectors.getToggleDrawer(),
  toggleDrawerSidebarData: selectors.getToogleSidebar()
})


export default connect(mapStateToProps,actions)(Dashboard);
