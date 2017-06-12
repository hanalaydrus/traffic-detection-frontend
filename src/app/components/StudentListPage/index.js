/**
 * require from depedencies
 */
import React, { Component } from 'react';
import { RaisedButton,MuiThemeProvider } from 'material-ui';
import SelectFields from '../SelectField'
import TableStudents from '../TableStudents'
import './styles.scss'
import * as constants from '../Drawer/constants'
const status = ["Pending","Siap Interview","Preparation","Gagal","Menunggu Dokumen","lulus"]

class StudentListPage extends Component {

  render() {
    return (
      <div > 
        <div className='container'>
          <div className='table-item'>
            <div className='select-item'>
              <SelectFields title = {'Select Status'} data={status} onEnterStatus={this.props.onEnterStatus.bind(this)}/>
            </div>
            <MuiThemeProvider>
              <TableStudents  data={this.props.dataTable}/>
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
