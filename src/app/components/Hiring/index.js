import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import HiringData from '../../../../temp-data/tempHiring.json';

const tableData = HiringData.data;

/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
export default class Hiring extends Component {
  state = {
    fixedHeader: true,
    fixedFooter: false,
    stripedRows: false,
    showRowHover: true,
    selectable: false,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: false,
    height: '500px'
  };

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled
    });
  };

  handleChange = (event) => {
    this.setState({ height: event.target.value });
  };

  render() {
    return (
      <div>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow style={{ backgroundColor: '#f9bb00' }}>
              <TableHeaderColumn style={{ width: '50', color: '#212121', fontWeight: 'Bold' }}>ID</TableHeaderColumn>
              <TableHeaderColumn style={{ color: '#212121', fontWeight: 'Bold' }}>Name</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '450', color: '#212121', fontWeight: 'Bold' }}>Link</TableHeaderColumn>
              <TableHeaderColumn style={{ textAlign: 'center', color: '#212121', fontWeight: 'Bold' }}>Viewed</TableHeaderColumn>
              <TableHeaderColumn style={{ textAlign: 'center', color: '#212121', fontWeight: 'Bold' }}>Requested</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableRowColumn style={{ width: '50' }}>{row.id}</TableRowColumn>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn style={{ width: '450' }}>{row.link}</TableRowColumn>
                <TableRowColumn style={{ textAlign: 'center' }}>{row.views}</TableRowColumn>
                <TableRowColumn style={{ textAlign: 'center' }}>{row.requested}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          />
        </Table>
      </div>
    );
  }
}
