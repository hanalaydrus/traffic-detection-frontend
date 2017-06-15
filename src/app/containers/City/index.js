//import library
import React, { Component } from 'react'
//import components from library
import {RaisedButton, TextField} from 'material-ui'
import {lightBlueA100, blue500, red500, orange500, orange600} from 'material-ui/styles/colors'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import Dialog from 'material-ui/Dialog'
//import components
import {Header} from './../../components/Header'
import {Drawer} from './../../components/DrawerBase'
import {PageTitle} from './../../components/PageTitle'
//import Json
import tempCity from '../../../../temp-data/tempCity.json'
//import styles
import './styles.scss'

//template styling
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
const customContentStyle = {
  width: '25%',
};


class City extends Component {
  constructor() {
    super()
    this.state = {
      navStyle: 'nav',
      drawerStyle: 'menu-drawer',
      contentStyle: style.content_less,
      cityData: tempCity.data,
      open:false,
      modalTitle: '',
      modal_delete : false,
      cityId: 0,
      cityName: '',
    }

  }
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  onAddClick = () => {
    this.setState({
      modal_delete: false,
      cityId: 0,
      cityName: '',
      modalTitle:'Add New City',
      open: true,
    })
  }
  onEditClick = (id, name) => {
    this.setState({
      modal_delete: false,
      modalTitle:'Edit City',
      cityId: id,
      cityName: name,
      open: true,

    })
  }
  onDeleteClick = (id, name) => {
    this.setState({
      modal_delete: true,
      modalTitle:'Delete '+ name +' City ?',
      cityId: id,
      cityName: name,
      open: true,
    })
  }
  isCity = (event,data) =>{
    this.setState({cityName:data})
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
            <PageTitle title="City" />
            <RaisedButton style={{marginTop:20,float:'right'}} labelStyle={{fontSize:12, fontWeight:'bold'}} label="Add City" backgroundColor={blue500} onClick={this.onAddClick}/>
            <div className="clear"></div>
            <div  className="table_container">
              <Table selectable={false} >
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow style={{backgroundColor:'#f9bb00'}}>
                    <TableHeaderColumn style={{color:'#000', fontWeight:'bold'}}>No</TableHeaderColumn>
                    <TableHeaderColumn style={{color:'#000', fontWeight:'bold'}}>City</TableHeaderColumn>
                    <TableHeaderColumn style={{color:'#000', fontWeight:'bold', textAlign:'center'}}>Action</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {this.state.cityData.map((row, index) =>(
                    <TableRow key={index.toString()}>
                      <TableRowColumn>{row.id}</TableRowColumn>
                      <TableRowColumn>{row.name}</TableRowColumn>
                      <TableRowColumn style={{textAlign:'center'}}>
                        <RaisedButton className="table_btn" labelStyle={{fontSize:12}} label="Edit" backgroundColor={lightBlueA100} onClick={ () => this.onEditClick(row.id, row.name)} />
                        <RaisedButton className="table_btn" labelStyle={{fontSize:12}} label="Delete" backgroundColor={red500}
                          onClick={() => this.onDeleteClick(row.id, row.name)}/>
                      </TableRowColumn>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          {/*Add Modal*/}
          <Dialog
            title={this.state.modalTitle}
            actions={this.state.modal_delete === false ?
              [
                <RaisedButton
                  label="Save"
                  backgroundColor={blue500}
                  onTouchTap={this.handleClose}
                  style={{marginRight:10}}
                />
              ]:
              [
                <RaisedButton
                  label="Yes"
                  backgroundColor={blue500}
                  onTouchTap={this.handleClose}
                  style={{marginRight:10}}
                />,
                <RaisedButton
                  label="No"
                  backgroundColor={red500}
                  onTouchTap={this.handleClose}
                  style={{marginRight:10}}
                />,
              ]
            }
            modal={false}
            contentStyle={customContentStyle}
            open={this.state.open}
            onRequestClose={this.handleClose}
            titleStyle={{backgroundColor:orange500}}
          >
          {this.state.modal_delete === false &&
          <TextField
            hintText="Name"
            floatingLabelText="Name"
            fullWidth={true}
            value={this.state.cityName}
            onChange={this.isCity}
          />
          }
          </Dialog>
        </div>
    );
  }
}

export default City;
