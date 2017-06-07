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

export default class TabsExampleControlled extends React.Component {

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
                {constant.pending.map(prop =>(<TableHeaderColumn>{prop}</TableHeaderColumn>))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.props.data.map((data,index)=>
                <TableRow selected={this.isSelected(index)}>
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{data.fullname}</TableRowColumn>
                <TableRowColumn>{data.email}</TableRowColumn>
                <TableRowColumn>{data.phone}</TableRowColumn>
                <TableRowColumn>{data.campuses}</TableRowColumn>
                <TableRowColumn>{data.batch}</TableRowColumn>
                <TableRowColumn>{data.status}</TableRowColumn>
                </TableRow> 
              )}
            </TableBody>
    </Table>
    );
  }
}
