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

const style = {
	tableHeader: {
		backgroundColor: '#FF9800',
		color: '#303030'
	}
};

class PartnerTable extends Component {
	constructor(...argument) {
		super(...argument);
	}
	render() {
    const { data, onDelete, onUpdate } = this.props;
		return (
			<Table>
				<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
					<TableRow style={style.tableHeader}>
						<TableHeaderColumn style={{ width: 10, color: '#303030', fontWeight: 'bold' }}>
							No
						</TableHeaderColumn>
						<TableHeaderColumn style={{ width: 30, color: '#303030', fontWeight: 'bold' }}>
							Name
						</TableHeaderColumn>
						<TableHeaderColumn style={{ width: 80, color: '#303030', fontWeight: 'bold' }}>
							Email
						</TableHeaderColumn>
						<TableHeaderColumn style={{ width: 50, color: '#303030', fontWeight: 'bold' }}>
							Action
						</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody displayRowCheckbox={false}>
					{data && data.map((table, index) => {
						return (
							<TableRow key={index}>
								<TableRowColumn style={{ width: 10 }}>{index + 1}</TableRowColumn>
								<TableRowColumn style={{ width: 30 }}>{table.name}</TableRowColumn>
								<TableRowColumn style={{ width: 80 }}>{table.email}</TableRowColumn>
								<TableRowColumn style={{ width: 80 }}>
									<button onClick={() => onDelete(table.id)}>Delete</button>
									<button  onClick={() => onUpdate(table.id)}>Update</button>
								</TableRowColumn>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		);
	}
}

PartnerTable.propTypes = {
  data: array,
  onDelete: func.isRequired,
  onUpdate: func.isRequired
};

export default PartnerTable;
