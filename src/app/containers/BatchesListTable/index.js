import React, { Component } from 'react'
import {
  RaisedButton, TextField, Checkbox, Dialog, FlatButton, Subheader, List, ListItem,
  DropDownMenu, MenuItem, DatePicker
} from 'material-ui'
import {orange600, orange500, blue500} from 'material-ui/styles/colors'

// import dependencies

import {Header} from "./../../components/Header"
import {Drawer} from "./../../components/DrawerBase"
import {PageTitle} from "./../../components/PageTitle"
import {BatchesTable} from "./../../components/BatchesTable"
import campusData from '../../../../temp-data/campusData.json'
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
   marginLeft: -22,
   marginTop: 4,
   marginBottom: -30,
 },
 customTitle: {
   marginTop: -30,
   marginBottom: -30,
   paddingTop: 12,
   paddingLeft: 12,
 },
 customTextfield: {
   marginTop: -12,
   marginBottom: -8,
 }, 
 customContent: {   
   paddingBottom: 0,
 },
 dialogSize: {
   height: 420,
   width: 500,
   marginLeft: 400,
   marginTop: -20,
 },
 buttonAdd: {
   marginTop: 10,
   marginBottom: 10,
 },
 dateContainer: {
  
 },
 datePicker: {
   display: "inline",
   float: "left",
   width: 100,
   marginRight: 12,
 },
 labelStyle: {
    marginBottom: -20,
    clear: "left",
    display: "block"
   },
}
//const dataCity = cityData.data

class BatchesListTable extends Component {
  constructor() {
    super()
      this.state = {
        navStyle: 'nav',
        drawerStyle: 'menu-drawer',
        contentStyle: style.content_less,
        controlledDate: null,
        id: "",
        batch_name: "",
        batch_number: "",
        batch_campus: "",
        register_start: "",
        register_end: "",
        prepare_start: "",
        prepare_end: "",
        tryout_date: "",
        tryout_announce_date: "",
        bootcamp_start: "",
        bootcamp_end: "",
        city: "",
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
  //Date Picker
  handleChangeRegisterStart = (event, date) => {    
    this.setState({register_start: date})
  }
  handleChangeRegisterEnd = (event, date) => {    
    this.setState({register_end: date})
  }
  handleChangePrepareStart = (event, date) => {    
    this.setState({prepare_start: date})
  }
  handleChangePrepareEnd = (event, date) => {    
    this.setState({prepare_end: date})
  }
  handleChangeTryout = (event, date) => {    
    this.setState({tryout_date: date})
  }
  handleChangeTryAnnounce = (event, date) => {    
    this.setState({tryout_announce_date: date})
  }
  handleChangeBootcampStart = (event, date) => {    
    this.setState({bootcamp_start: date})
  }
  handleChangeBootcampEnd = (event, date) => {    
    this.setState({bootcamp_end: date})
  }

  handleChangeDropDown = (event, index, value) => this.setState({value});
  
  
  //CRUD event goes down below
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
        batch_name: "",
        batch_number: "",
        batch_campus: "",
        register_start: "",
        register_end: "",
        prepare_start: "",
        prepare_end: "",
        tryout_date: "",
        tryout_announce_date: "",
        bootcamp_start: "",
        bootcamp_end: "",
        city: "",
      });
  }  

  submitUpdate = () => {
      const {
      batch_name, batch_number, batch_campus, register_start, register_end, prepare_start,
      prepare_end, tryout_date,tryout_announce_date, 
      bootcamp_start, bootcamp_end, 
  city, value, updateId
    } = this.state;
    const splittedValue = value.split(" ");

    const update = {
      id : updateId,
      batch_name: batch_name,
      batch_number: batch_number,
      batch_campus: splittedValue[0],
      register_start: register_start,
      register_end: register_end,
      prepare_start: prepare_start,
      prepare_end: prepare_end,
      tryout_date: tryout_date,
      tryout_announce_date: tryout_announce_date,
      bootcamp_start: bootcamp_start,
      bootcamp_end: bootcamp_end,
      city: {
        name: splittedValue[1]
      },
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
     const {
      batch_name, batch_number, batch_campus, register_start, register_end, prepare_start,
      prepare_end, tryout_date,tryout_announce_date, 
      bootcamp_start, bootcamp_end, 
      city, value,updateId
    } = this.state;
    const splittedValue = value.split(" ");

    const post = {
      id: this.state.data.length + 1,
      batch_name: batch_name,
      batch_number: batch_number,
      batch_campus: splittedValue[0],
      register_start: register_start,
      register_end: register_end,
      prepare_start: prepare_start,
      prepare_end: prepare_end,
      tryout_date: tryout_date,
      tryout_announce_date: tryout_announce_date,
      bootcamp_start: bootcamp_start,
      bootcamp_end: bootcamp_end,
      city: {
        name: splittedValue[1]
      },
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
            <PageTitle title="Batches" />
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
                  title={<Subheader>Refactory's Batch</Subheader>}
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                  autoDetectWindowHeight={false}
                  autoScrollBodyContent={false}
                  style={style.dialogSize}
                  titleStyle={style.customTitle}
                  bodyStyle={style.customContent}
              >
                <List>
                  <TextField
                        hintText={this.state.batch_name}
                        floatingLabelText="Name"
                        onChange={this.onChangeData('batch_name')} 
                        style={style.customTextfield}/>
                        <br/>
                  <TextField
                        hintText={this.state.batch_number}
                        floatingLabelText="Number"
                        onChange={this.onChangeData('batch_number')} 
                        type="Number" 
                        style={style.customTextfield}/>                        
                        <br/>
                  <DropDownMenu
                      value={this.state.value}
                      onChange={this.handleChangeDropDown}
                      style={style.customWidthDropdown}
                      autoWidth={false}
                  >                                      
                    {
                      campusData.data.map((campus, index) => {
                        return (
                            <MenuItem 
                              key={campus.id}
                              value={campus.name + " " + campus.city.name} 
                              primaryText={campus.name + " " + campus.city.name}
                              onChange={this.onChangeData('value')}                              
                           />                       
                        )
                      })                      
                    }
                    
                  </DropDownMenu>
                  <div style={style.dateContainer}>
                      <br/>
                      <label style={style.labelStyle}>Registration Schedule:</label>
                      <br/>
                      <DatePicker
                        hintText="Start"
                        value={this.state.register_start}
                        onChange={this.handleChangeRegisterStart} 
                        textFieldStyle={style.datePicker}/>
                      <DatePicker
                        hintText="End"
                        value={this.state.register_end}
                        onChange={this.handleChangeRegisterEnd} 
                        textFieldStyle={style.datePicker}/>
                      <br/>
                      <label style={style.labelStyle}>Preparation Schedule:</label>
                      <br/>
                      <DatePicker
                        hintText="Start"
                        value={this.state.prepare_start}
                        onChange={this.handleChangePrepareStart}
                        textFieldStyle={style.datePicker} />
                      <DatePicker
                        hintText="End"
                        value={this.state.prepare_end}
                        onChange={this.handleChangePrepareEnd}
                        textFieldStyle={style.datePicker} />
                      <br/>
                      <label style={style.labelStyle}>Tryout Schedule:</label>
                      <br/>
                      <DatePicker
                        hintText="Tryout"
                        value={this.state.tryout_date}
                        onChange={this.handleChangeTryout}
                        textFieldStyle={style.datePicker} />
                      <br/>
                      <label style={style.labelStyle}>Tryout Announcement:</label>
                      <br/>
                      <DatePicker
                        hintText="Announcement"
                        value={this.state.tryout_announce_date}
                        onChange={this.handleChangeTryAnnounce}
                        textFieldStyle={style.datePicker} />
                      <br/>
                      <label style={style.labelStyle}>Bootcanmp Schedule:</label>
                      <br/>
                      <DatePicker
                        hintText="Start"
                        value={this.state.bootcamp_start}
                        onChange={this.handleChangeBootcampStart}
                        textFieldStyle={style.datePicker} />
                      <DatePicker
                        hintText="End"
                        value={this.state.bootcamp_end}
                        onChange={this.handleChangeBootcampEnd}
                        textFieldStyle={style.datePicker} />
                  </div>
                </List>

              </Dialog>            
            </div>
            <BatchesTable 
              data={this.state.data} 
              onUpdate={this.onUpdate.bind(this)}
              onDelete={this.onDelete.bind(this)}
              />  
          </div>
        </div>
    );
  }
}

export default BatchesListTable;
