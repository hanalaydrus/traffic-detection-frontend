import React from 'react';
import { 
  Tabs,
  Tab, 
 } from 'material-ui/Tabs';
 import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TableHeaders from '../TableHeaders'
import * as constant from './tableHeader';
/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */

export default class TableStudents extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '"pending"',
      selected: [1]
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1;
  };

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });
  };
  render() {
    return (
      <Table onRowSelection={this.handleRowSelection}>
            <TableHeader >
              <TableRow>
                {constant.pending.map((prop, index) =>(<TableHeaderColumn key={index.toString()}>{prop}</TableHeaderColumn>))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.props.data.map((data,index)=>
                <TableRow key={index.toString()} selected={this.isSelected(index)}>
                <TableRowColumn key={index.toString()}>{index}</TableRowColumn>
                <TableRowColumn key={index.toString()}>{data.fullname}</TableRowColumn>
                <TableRowColumn key={index.toString()}>{data.email}</TableRowColumn>
                <TableRowColumn key={index.toString()}>{data.phone}</TableRowColumn>
                <TableRowColumn key={index.toString()}>{data.campuses}</TableRowColumn>
                <TableRowColumn key={index.toString()}>{data.batch}</TableRowColumn>
                <TableRowColumn key={index.toString()}>{data.status}</TableRowColumn>
                </TableRow> 
              )}
            </TableBody>
    </Table>
    );
  }
}
