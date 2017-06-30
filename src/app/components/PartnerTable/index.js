import React, { Component } from 'react';
import { RaisedButton, TextField } from 'material-ui';
import { green500, blue500, orange500, orange600 } from 'material-ui/styles/colors';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Response from './constant';
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
					{this.props.data.map((table, index) => {
						return (
							<TableRow key={index}>
								<TableRowColumn style={{ width: 10 }}>{index + 1}</TableRowColumn>
								<TableRowColumn style={{ width: 30 }}>{table.name}</TableRowColumn>
								<TableRowColumn style={{ width: 80 }}>{table.email}</TableRowColumn>
								<TableRowColumn style={{ width: 80 }}>
									<button onClick={() => this.props.onDelete(table.id)}>Delete</button>
									<button  onClick={() => this.props.onUpdate(table.id)}>Update</button>
								</TableRowColumn>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		);
	}
}

export default PartnerTable;
