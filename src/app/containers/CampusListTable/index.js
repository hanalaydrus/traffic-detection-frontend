import React, { Component } from 'react'
import {
  RaisedButton, TextField, Checkbox, Dialog, FlatButton, Subheader, List, ListItem,
  DropDownMenu, MenuItem
} from 'material-ui'
import {orange600, orange500, blue500} from 'material-ui/styles/colors'

// import dependencies

import {Header} from "./../../components/Header"
import {Drawer} from "./../../components/DrawerBase"
import {PageTitle} from "./../../components/PageTitle"
import {CampusTable} from "./../../components/CampusTable"
import cityData from '../../../../temp-data/cityData.json'

/**
 * overide material-ui default style * 
 */
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
 },
 customWidth: {
   width: 300,
   marginLeft: -24,
   marginTop: 20,
 },
 dialogSize: {
   height: 900,
   width: 600,
   marginLeft: 400,
 },
 buttonAdd: {
   marginTop: 10,
   marginBottom: 10,
 }
}
const dataCity = cityData.data

class CampusListTable extends Component {
  constructor() {
    super()
    this.state = {
      navStyle: 'nav',
      drawerStyle: 'menu-drawer',
      contentStyle: style.content_less, 
      open: false,
      value: 1,
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleChange = (Nav, Draw) => {
    this.setState({ navStyle: Nav })
    this.setState({ drawerStyle: Draw })
    const Const = this.state.contentStyle === style.content_less ? style.content_full : style.content_less;
    this.setState({ contentStyle: Const})
  }

  handleChangeDropDown = (event, index, value) => this.setState({value});
  
  render() {
    
    // constant for open dialog button
    const actions = [
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
        <div style={{margin:0}}>
          <Header onClick={this.handleChange} navStyle={this.state.navStyle} drawerStyle={this.state.drawerStyle} content={this.state.content}/>
          <Drawer drawerStyle={this.state.drawerStyle} />
          <div style={this.state.contentStyle}>
            <PageTitle title="Campuses" />
            <div>
              <div style={style.buttonAdd}>
                <RaisedButton 
                  label="add"
                  onTouchTap={this.handleOpen} 
                  backgroundColor= {blue500}
                  labelStyle={{fontWeight: 'bold'}}
                />
              </div>
              <Dialog
                  title={<Subheader>Create New Campus</Subheader>}
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                  autoDetectWindowHeight={false}
                  autoScrollBodyContent={false}
                  style={style.dialogSize}
              >
                <List>
                  <TextField
                        hintText="Campus's Name"
                        floatingLabelText="Name"/>
                        <br/>
                  <TextField
                        hintText="Campus's Address"
                        floatingLabelText="Campus"/> 
                        <br/> 
                  <DropDownMenu
                      value={this.state.value}
                      onChange={this.handleChangeDropDown}
                      style={style.customWidth}
                      autoWidth={false}
                  >                                      
                    {
                      dataCity.map((row, index) => {
                        return (
                          <MenuItem value={row.id} primaryText={row.name} />
                        )
                      })
                    }
                  </DropDownMenu>
                        <br/>                  
                  <TextField
                        hintText="Campus's Phone"
                        floatingLabelText="Phone"/> 
                        <br/>
                  <TextField
                        hintText="Description"
                        floatingLabelText="Description"
                        multiLine={true}
                        rows={3}
                      />                                   
                </List>
              </Dialog>
            </div>
            <CampusTable />  
          </div>
        </div>
    );
  }
}

export default CampusListTable;
