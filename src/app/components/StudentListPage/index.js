/**
 * require from depedencies
 */
import React, { Component } from 'react';
import { RaisedButton,MuiThemeProvider } from 'material-ui';
import SelectFields from '../SelectField'
import TabsExampleControlled from '../TableContainer'
import './styles.scss'
import * as constants from '../TableContainer/tableHeader'
const style = {
  margin: 5,
};

class StudentListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:1,
      campus: ["kampus1" , "kampus2","kampus3"],
      batch:["batch1", "batch2","all batch"],
      status:["Pending","Siap Interview","Preparation","Gagal","Menunggu Dokumen","lulus"],
      data:constants.seederData,
    };
  }
  dataStudent = (status) => {
      this.setState({
            data: this.getDataBystatus(status),
        });   
    }
  getDataBystatus  = (status) => {
    return constants.seederData.filter((prop) => prop.status === status)
  }
  render() {
    return (
      <div > 
        <div className='container'>
          <div>
            <SelectFields title = {'Select Campus'} data={this.state.campus}/>
            <SelectFields title = {'Select Batch'} data={this.state.campus}/>  
            <MuiThemeProvider>
              <RaisedButton label="Students" style={style} />
            </MuiThemeProvider>
          </div>
          <div className='table-item'>
            <div className='select-item'>
              <SelectFields title = {'Select Status'} data={this.state.status} dataStudent={this.dataStudent.bind(this)}/>
            </div>
            <MuiThemeProvider>
              <TabsExampleControlled data={this.state.data}/>
            </MuiThemeProvider>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentListPage;
