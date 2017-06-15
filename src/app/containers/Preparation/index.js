import React, { Component } from 'react';
import {RaisedButton, TextField, Checkbox} from 'material-ui';
import {orange600, orange500} from 'material-ui/styles/colors';

// import dependencies

import {Header} from "./../../components/Header";
import {Drawer} from "./../../components/DrawerBase";
import {PageTitle} from "./../../components/PageTitle";
import {PreparationPic} from "./../../components/PreparationPic";
import PrepData from '../../../../temp-data/preparationPic.json';


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

const prepData = PrepData.data

class Preparation extends Component {
  constructor() {
    super()
    this.state = {
      navStyle: 'nav',
      drawerStyle: 'menu-drawer',
      contentStyle: style.content_less,
      

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
            <PageTitle title="Preparation" />
            <div className="clear"></div>
              <PreparationPic />  
          </div>
        </div>
    );
  }
}

export default Preparation;
