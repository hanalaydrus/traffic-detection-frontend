/**
 * require from depedencies
 */
import React, { Component } from 'react';
import { array, func } from 'prop-types';
import { MuiThemeProvider } from 'material-ui';
import SelectFields from '../SelectField';
import TableStudents from '../TableStudents';
import './styles.scss';

const status = [ 'Pending', 'Siap Interview', 'Preparation', 'Gagal', 'Menunggu Dokumen', 'lulus' ];

class StudentListPage extends Component {
  render() {
    const { onEnterStatus, dataTable } = this.props;
    return (
      <div >
        <div className="container">
          <div className="table-item">
            <div className="select-item">
              <SelectFields
                title={'Select Status'}
                data={status}
                onEnterStatus={onEnterStatus.bind(this)}
              />
            </div>
            <MuiThemeProvider>
              <TableStudents data={dataTable} />
            </MuiThemeProvider>
          </div>
        </div>
      </div>
    );
  }
}

StudentListPage.propTypes = {
  onEnterStatus: func,
  dataTable: array
};

export default StudentListPage;
