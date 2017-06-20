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
import response from "./constant"

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
  customWidthDropdown: {
   width: 300,
   marginLeft: -24,
   marginTop: 20,
 },
 dialogSize: {
   height: 550,
   width: 500,
   marginLeft: 400,
   marginTop: -20
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
        id: '',
        name: '',
        address: '',
        phone: '',
        city: '',
        description: '',
			  data: response.data, 
        open: false,
        value: 1,
        updateId: null,
        update: false,
      }    
  }

  // Button Pop-up and and Button Close
  handleOpen = () => {
    this.setState({
      open: true,
      update: false  
    });
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
  
  
  //CRUD event goes below mate!
  onChangeData = type => (event, value) => {
    this.setState(
      {
        [type]: value
      });
  }

  onUpdate = id => {
    this.setState(
      {
        open: true,
        update: true,
        updateId: id,
      });
  }

  onDelete = id => {
    const result = this.state.data.filter((res, index) => res.id !== id);
    this.setState(
      {
        data: result,
        name: '',
        address: '',
        city: '',
        phone: '',
        description: '',

      });
  }  

  submitUpdate = () => {
    const {name, address, city, value, phone, description, updateId} = this.state;
    const update = {
      id : updateId,
      name: name,
      address: address,
      city: {
        name: value
      },
      phone: phone,
      description: description
    };
    this.setState(
      {
        data: this.getUpdate(updateId, update),
        open: !this.state.open,
      });
  }

  getUpdate =(id,update) => {
     return this.state.data.map((res) => (res.id === id) ? update :res)
  }

  onSubmitData = () => {
    const { name, address, value, city, phone, description } = this.state;
    const post = {
      id: this.state.data.length + 1,
      name: name,
      address: address,
      city: {
        name: value
      },
      phone: phone,
      description: description,
    };
    this.setState({
      data: this.state.data.concat(post),
      open: !this.state.open,
    });
  }

  //Render this! 
  render() {
    
    // constant for open dialog button
    const actions = [
      (this.state.update) ?
      <FlatButton
        label="Update"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => this.submitUpdate()}
      />
        :

      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => this.onSubmitData()}
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
                        hintText={this.state.name}
                        floatingLabelText="Name"
                        onChange={this.onChangeData('name')} />
                        <br/>
                  <TextField
                        hintText={this.state.address}
                        floatingLabelText="Address"
                        onChange={this.onChangeData('address')}/> 
                        <br/> 
                  <DropDownMenu
                      value={this.state.value}
                      onChange={this.handleChangeDropDown}
                      style={style.customWidthDropdown}
                      autoWidth={false}
                  >                                      
                    {
                      response.data.map((kota, index) => {
                        return (
                            <MenuItem 
                              key={kota.city_id}
                              value={kota.city.name} 
                              primaryText={kota.city.name}
                              onChange={this.onChangeData('value')}                              
                           />                       
                        )
                      })                      
                    }
                    
                  </DropDownMenu>
                        <br/>                  
                  <TextField
                        hintText={this.state.phone}
                        floatingLabelText="Phone"
                        onChange={this.onChangeData('phone')}/> 
                        <br/>
                  <TextField
                        hintText={this.state.description}
                        floatingLabelText="Description"
                        multiLine={true}
                        rows={3}
                        onChange={this.onChangeData('description')}
                      />                                   
                </List>
              </Dialog>
            </div>
            <CampusTable 
              data={this.state.data}
              onUpdate={this.onUpdate.bind(this)}
              onDelete={this.onDelete.bind(this)}/>  
          </div>
        </div>
    );
  }
}

export default CampusListTable;
