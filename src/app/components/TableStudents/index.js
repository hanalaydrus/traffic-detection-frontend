import React, { Component } from 'react';
import { array } from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import * as constant from './tableHeader';

/**
 * A simple table demonstrating the hierarchy
 * of the `Table` component and its sub-components.
 */
export default class TableStudents extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '"pending"',
      selected: [ 1 ]
    };
  }

  handleChange = (value) => {
    this.setState({ value: value });
  };

  isSelected = index => this.state.selected.indexOf(index) !== -1;

  handleRowSelection = (selectedRows) => {
    this.setState({ selected: selectedRows });
  };

  render() {
    return (
      <Table onRowSelection={this.handleRowSelection}>
        <TableHeader >
          <TableRow>
            {
              constant.pending.map( (prop, index) => {
                return (
                  <TableHeaderColumn key={index}>
                    {prop}
                  </TableHeaderColumn>
                );
              })
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            this.props.data.map( (data, index) => {
              return (
                  <TableRow key={index} selected={this.isSelected(index)}>
                    <TableRowColumn key={index}>{index}</TableRowColumn>
                    <TableRowColumn key={index}>{data.fullname}</TableRowColumn>
                    <TableRowColumn key={index}>{data.email}</TableRowColumn>
                    <TableRowColumn key={index}>{data.phone}</TableRowColumn>
                    <TableRowColumn key={index}>{data.campuses}</TableRowColumn>
                    <TableRowColumn key={index}>{data.batch}</TableRowColumn>
                    <TableRowColumn key={index}>{data.status}</TableRowColumn>
                 </TableRow>
              );
            })
          }
        </TableBody>
      </Table>
    );
  }
}

TableStudents.propTypes = {
  data: array
};
