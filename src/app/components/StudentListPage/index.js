/**
 * require from depedencies
 */
import React, { Component } from 'react';
import { RaisedButton,MuiThemeProvider } from 'material-ui';
import SelectFields from '../SelectField'
import TableStudents from '../TableContainer'
import './styles.scss'
import * as constants from '../Drawer/constants'


class StudentListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:1,
      campus: ["kampus1" , "kampus2","kampus3"],
      batch:["batch1", "batch2","all batch"],
      status:["Pending","Siap Interview","Preparation","Gagal","Menunggu Dokumen","lulus"],
      data:[],
      dataTable:[]
    };
  }
  componentDidMount(){
    this.setState({
      data:getStudent(constants.data),
      dataTable:getStudent(constants.data)
    })
  }
  dataStudent = (status) => {
      console.log(this.state.dataTable)
      this.setState({
            dataTable: this.getDataBystatus(status),
        });   
    }
  getDataBystatus  = (value) => {
    return this.state.dataTable.filter((prop) => prop.status === value)
  }
  getDataByBatch = (value) => {
    return this.state.dataTable.filter((prop)=> props.batch === value)
  }
  getDataByCampus = (value) => {
    return this.state.dataTable.filter((prop) => props.campuses === value)
  }
  render() {
    return (
      <div > 
        <div className='container'>
          <div className='table-item'>
            <div className='select-item'>
              <SelectFields title = {'Select Status'} data={this.state.status} dataStudent={this.dataStudent.bind(this)}/>
            </div>
            <MuiThemeProvider>
              <TableStudents data={this.state.dataTable}/>
            </MuiThemeProvider>
          </div>
        </div>
      </div>
    );
  }
}

function getStudent(data){
    return data.reduce((acc,curr) => {return acc.concat(curr.student)},[])
}

export default StudentListPage;
