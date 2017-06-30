import React, { Component } from 'react';
import { array, func } from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
/**
 * imported others Library *
 **/

const style = {
  tableHeader: {
    backgroundColor: '#FF9800',
    color:'#303030'
  }
};

export class BatchesTable extends Component {
  constructor(...argument) {
    super(...argument);
  }
  render () {
    return (
      //code goes here
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow style={style.tableHeader}>
            <TableHeaderColumn style={{ width: 10,color: '#303030',fontWeight: 'bold' }}>No</TableHeaderColumn>
            <TableHeaderColumn style={{ width: 30,color: '#303030',fontWeight: 'bold' }}>Name</TableHeaderColumn>
            <TableHeaderColumn style={{ width: 80,color: '#303030',fontWeight: 'bold' }}>Campus</TableHeaderColumn>
            <TableHeaderColumn style={{ width: 50,color: '#303030',fontWeight: 'bold' }}>City</TableHeaderColumn>
						<TableHeaderColumn style={{ width: 50, color: '#303030', fontWeight: 'bold' }}>
							Action
						</TableHeaderColumn>
          </TableRow>
        </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {
                this.props.data.map( (table, index) => {
                    return (
                      <TableRow key={index}>
                          <TableRowColumn style={{ width: 10 }}>{index + 1}</TableRowColumn>
                          <TableRowColumn style={{ width: 30 }}>{'#' + table.batch_number + ' ' + table.batch_name}</TableRowColumn>
                          <TableRowColumn style={{ width: 80 }}>{table.batch_campus}</TableRowColumn>
                          <TableRowColumn style={{ width: 50 }}>{table.city.name}</TableRowColumn>
                          <TableRowColumn style={{ width: 50 }}>
									          <button onClick={() => this.props.onUpdate(table.id)}>Update</button>
                            <button onClick={() => this.props.onDelete(table.id)}>Delete</button>
                          </TableRowColumn>
                      </TableRow>
                    );}
                )
              }
            </TableBody>
        </Table>
    );
  }
}

BatchesTable.propTypes = {
  data: array,
  onUpdate: func.isRequired,
  onDelete: func.isRequired
};
