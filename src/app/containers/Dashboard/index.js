import React, { Component } from 'react';
import {RaisedButton, TextField} from 'material-ui';
import {orange600, orange500} from 'material-ui/styles/colors';
import {Header} from "./../../components/Header";
import {Drawer} from "./../../components/Drawer";
import StudentListPage from "./../../components/StudentListPage";
/**
 * 
 */
import *as constants from './constants'
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

  constructor(props) {
      super(props);
      this.state = {
        navStyle: 'nav',
        drawerStyle: 'menu-drawer',
        contentStyle: style.content_less,
        value:1,
        campus:[],
        status:["Pending","Siap Interview","Preparation","Gagal","Menunggu Dokumen","lulus","all"],
        data:[],
        dataTable:[],
        statsSelect:'all',
        campusSelect:'all',
        batchSelect:'all'
      };
    }
  
  componentWillMount(){
    this.setState({
      data:getStudent(constants.data),
      dataTable:getStudent(constants.data),
      campus:getCampus(constants.data)['city']
    })
  }

  dataStatus = (value) => {
      this.setState({
            statsSelect:value,
            dataTable: this.getDataBystatus(status),
        });   
  }
 
  dataBatch = (value) => {
      this.setState({
            batchSelect:status,
            dataTable: this.getDataBystatus(status),
        });   
  }
  
  dataCampus = (status) => {
      this.setState({
            campusSelect:value,
            dataTable: this.getDataBystatus(status),
        });   
  }
   
  getDataBystatus  = (value) => {
    if(value==='all' && this.state.batchSelect === 'all' && this.state.campusSelect === 'all'){
      return this.state.data
    }else if(value === 'all' && this.state.batchSelect !== 'all'|| value === 'all' && this.state.campusSelect !== 'all'){
      return this.state.dataTable
    }else{
      return this.state.dataTable.filter((prop) => prop.status === value)
    }     
  }
  
  getDataByBatch = (value) => {
   if (value==='all' && this.state.statsSelect === 'all' && this.state.campusSelect === 'all') {
      return this.state.data
    }else if (value === 'all' && this.state.statsSelect !== 'all'|| value === 'all' && this.state.campusSelect !== 'all'){
      return this.state.dataTable
    }else{
      return this.state.dataTable.filter((prop) => prop.status === value)
    }   
  }
  
  getDataByCampus = (value) => {
    if (value==='all' && this.state.statsSelect === 'all' && this.state.batchSelect === 'all') {
      return this.state.data
    }else if (value === 'all' && this.state.statsSelect !== 'all'|| value === 'all' && this.state.batchSelect !== 'all'){
      return this.state.dataTable
    }else{
      return this.state.dataTable.filter((prop) => prop.status === value)
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
            <StudentListPage />
          </div>
        </div>
    );
  }
}

function getStudent(data){
    return data.reduce((acc,curr) => acc.concat(curr.student),[])
}

function getCampus(data){
    return data.reduce((acc,curr) => {
        delete curr['student']
        return acc.concat(Object.assign({},curr))
    },[])
}


function getListBatch(data){
    return data.reduce((acc,curr) => acc.concat(curr.batch),[])
}

export default Dashboard;
