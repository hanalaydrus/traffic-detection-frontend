import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const styles = {
  propContainer: {
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
  palette: {
    textColor: 'white',
    primaryColor: 'orange'
  }
};

const tableData = [
  {
    name: 'tiket.com',
    link: '-',
    viewed: '30',
    requested: '2',
  },
  {
    name: 'traveloka.com',
    link: '-',
    viewed: '26',
    requested: '6',
  },
];

/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
export default class TableExampleComplex extends Component {
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
    height: '500px',
  };

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
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
            <TableRow style={{backgroundColor:'#f9bb00'}}>
              <TableHeaderColumn style={{color:'#212121', fontWeight: 'Bold'}} tooltip="Num">ID</TableHeaderColumn>
              <TableHeaderColumn style={{color:'#212121', fontWeight: 'Bold'}} tooltip="Name">Name</TableHeaderColumn>
              <TableHeaderColumn style={{color:'#212121', fontWeight: 'Bold'}} tooltip="Link">Link</TableHeaderColumn>
              <TableHeaderColumn style={{color:'#212121', fontWeight: 'Bold'}} tooltip="Viewed">Viewed</TableHeaderColumn>
              <TableHeaderColumn style={{color:'#212121', fontWeight: 'Bold'}} tooltip="Requested">Requested</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {tableData.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{index+1}</TableRowColumn>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.link}</TableRowColumn>
                <TableRowColumn>{row.viewed}</TableRowColumn>
                <TableRowColumn>{row.requested}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
          </TableFooter>
        </Table>
      </div>
    );
  }
}
