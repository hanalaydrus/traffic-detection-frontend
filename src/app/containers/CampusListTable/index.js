import React, { Component } from 'react';
import {
  RaisedButton, TextField, Dialog, Subheader, List,
  DropDownMenu, MenuItem
} from 'material-ui';
import { orange600, blue500 } from 'material-ui/styles/colors';
import { bool, array, object } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'react-loader';

// import dependencies

import { Header } from './../../components/Header';
import { Drawer } from './../../components/DrawerBase';
import { PageTitle } from './../../components/PageTitle';
import { CampusTable } from './../../components/CampusTable';
import response from './constant';
import * as actions from './actions';
import * as selectors from './selectors';
import { fetchCityData } from './../City/actions';
import { getCityData, getIsFetchingCity } from './../City/selectors';

/**
 * overide material-ui default style *
 */
const style = {
  orange: {
   borderColor: orange600
 },
  content_full: {
   marginLeft:0,
   padding:40,
   paddingTop:20,
   transition:'1s all ease'
 },
  content_less: {
   marginLeft:250,
   padding:40,
   paddingTop:20,
   transition:'1s all ease'
 },
  customWidthDropdown: {
   width: 300,
   marginLeft: -24,
   marginTop: 20
 },
 dialogSize: {
   height: 550,
   width: 500,
   marginLeft: 400,
   marginTop: -20
 },
 buttonAdd: {
   marginTop: 10,
   marginBottom: 10
 }
};

class CampusListTable extends Component {
  constructor() {
    super();
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
        value: {},
        update: false,
        delete: false,
        modalTitle: ''
      };
  }

  // Button Pop-up and and Button Close
  handleOpen = () => {
    this.setState({
      open: true,
      update: false,
      delete: false
    });
  }

  handleClose = () => {
    this.setState(
      {
        id: '',
        name: '',
        address: '',
        city: '',
        phone: '',
        description: '',
        value: {},
        update: false,
        delete: false,
        open: false
      });
  }

  handleChange = (Nav, Draw) => {
    this.setState({ navStyle: Nav });
    this.setState({ drawerStyle: Draw });
    const Const = this.state.contentStyle === style.content_less ? style.content_full : style.content_less;
    this.setState({ contentStyle: Const });
  }

  handleChangeDropDown = (event, index, value) => this.setState({ value });


  //CRUD event goes below mate!
  onChangeData = type => (event, value) => {
    this.setState({
        [type]: value
    });
  }

  onAdd = () => {
    this.setState({
      open: true,
      update: false,
      delete: false,
      modalTitle: 'Create New Campus'
    });
  }

  onUpdate = (id, name, address, value, phone, description) => {
    this.setState({
      id: id,
      open: true,
      update: true,
      delete: false,
      name: name,
      address: address,
      value: value,
      phone: phone,
      description: description,
      modalTitle: 'Update Campus'
    });
  }

  onDelete = (id, name) => {
    this.setState({
      id: id,
      open: true,
      update: false,
      delete: true,
      modalTitle: 'Delete '+ name +' Campus ?'
    });
  }

  onUpdateData = () => {
    const { id, name, address, value, phone, description } = this.state;
    this.handleClose();
    this.props.updateCampusesData(id, name, address, value, phone, description);
    this.props.fetchCampusesData();
  }

  onDeleteData = () => {
    const { id } = this.state;
    this.handleClose();
    this.props.deleteCampusesData(id);
    this.props.fetchCampusesData();
  }

  onSubmitData = () => {
    const { name, address, value, phone, description } = this.state;
    this.handleClose();
    this.props.submitCampusesData(name, address, value, phone, description);
    this.props.fetchCampusesData();
  }
  componentWillMount() {
    this.props.fetchCampusesData();
    this.props.fetchCityData();
  }
  //Render this!
  render() {

    // constant for open dialog button
    const actions = [
      (this.state.update) ?
      <RaisedButton
        label="Update"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => this.onUpdateData()}
      />
    : (this.state.delete) ?
    <RaisedButton
      label="Delete"
      primary={true}
      keyboardFocused={true}
      onTouchTap={() => this.onDeleteData()}
    />
    :
      <RaisedButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => this.onSubmitData()}
      />
    ];
    return (
        <div style={{ margin:0 }}>
          <Header onClick={this.handleChange} navStyle={this.state.navStyle} drawerStyle={this.state.drawerStyle} content={this.state.content} />
          <Drawer drawerStyle={this.state.drawerStyle} />
          <div style={this.state.contentStyle}>
            <PageTitle title="Campuses" />
            <div>
              <div style={style.buttonAdd}>
                <RaisedButton
                  label="add"
                  onTouchTap={this.onAdd}
                  backgroundColor= {blue500}
                  labelStyle={{ fontWeight: 'bold' }}
                />
              </div>
              <Dialog
                  title={<Subheader>{this.state.modalTitle}</Subheader>}
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                  autoDetectWindowHeight={false}
                  autoScrollBodyContent={false}
                  style={style.dialogSize}
              >
              { !(this.state.delete) && (
                <List>
                  <TextField
                        hintText="Name"
                        floatingLabelText="Name"
                        value={this.state.name}
                        onChange={this.onChangeData('name')} />
                        <br />
                  <TextField
                        hintText="Address"
                        value={this.state.address}
                        floatingLabelText="Address"
                        onChange={this.onChangeData('address')} />
                        <br />
                  <DropDownMenu
                      floatingLabelText="City"
                      value={this.state.value}
                      onChange={this.handleChangeDropDown}
                      style={style.customWidthDropdown}
                      autoWidth={false}

                  >
                    {
                      this.props.cityData.map((kota, index) => {
                        return (
                            <MenuItem
                              key={index}
                              value={kota.id}
                              primaryText={kota.name}
                              onChange={this.onChangeData('value')}
                           />
                        );
                      })
                    }

                  </DropDownMenu>
                        <br />
                  <TextField
                        hintText="Phone"
                        value={this.state.phone}
                        floatingLabelText="Phone"
                        onChange={this.onChangeData('phone')} />
                        <br />
                  <TextField
                        hintText="Description"
                        value={this.state.description}
                        floatingLabelText="Description"
                        multiLine={true}
                        rows={1}
                        rowsMax={4}
                        onChange={this.onChangeData('description')}
                      />
                </List>
              )}
              </Dialog>
            </div>
            {(this.props.isFetchingCampuses || this.props.isFetchingCity) ?
            (<Loader type="line-scale" color="#fff" active />) :
            (<CampusTable
              data={this.props.campusesData}
              onUpdate={this.onUpdate.bind(this)}
              onDelete={this.onDelete.bind(this)} />)
          }
          </div>
        </div>
    );
  }
}

/**
 *  Define component PropTypes
 */
CampusListTable.propTypes = {
  campusesData: array.isRequired,
  deleteCampuses: object.isRequired,
  isFetchingCampuses: bool.isRequired,
  cityData: array.isRequired,
  isFetchingCity: bool.isRequired
};

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  campusesData: selectors.getCampusesData(),
  deleteCampuses: selectors.getDeleteCampuses(),
  isFetchingCampuses: selectors.getIsFetchingCampuses(),
  cityData:getCityData(),
  isFetchingCity:getIsFetchingCity()
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      ...actions,
      fetchCityData
    }, dispatch);
}

/**
 *  Export the component
 */
export default connect(mapStateToProps, mapDispatchToProps)(CampusListTable);
