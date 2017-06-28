import React, { Component } from "react"
import {RaisedButton, TextField} from "material-ui"
import {green500, blue500, orange500, orange600, red500} from "material-ui/styles/colors"
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import moment from 'moment'
/**
 * imported others Library *
 **/
import { Enhance } from '../../HOC/fetchingData'
import {PageTitle} from "./../../components/PageTitle"
import campustListData from '../../../../temp-data/campusData.json'
import './style.scss'

const Data = campustListData.data

const style = {
  tableHeader: {
    backgroundColor: '#FF9800',
    color:'#303030',
  }
}

export class CampusTable extends Component {
  constructor(...argument){
    super(...argument);
  }
  render () {
    return (
      //code goes here
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow style={style.tableHeader}>
            <TableHeaderColumn style={{width: 10,color: '#303030',fontWeight: 'bold'}}>No</TableHeaderColumn>
            <TableHeaderColumn style={{width: 30,color: '#303030',fontWeight: 'bold'}}>Name</TableHeaderColumn>
            <TableHeaderColumn style={{width: 80,color: '#303030',fontWeight: 'bold'}}>Address</TableHeaderColumn>
            <TableHeaderColumn style={{width: 50,color: '#303030',fontWeight: 'bold'}}>City</TableHeaderColumn>
            <TableHeaderColumn style={{width: 50,color: '#303030',fontWeight: 'bold'}}>Phone</TableHeaderColumn>
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
                          <TableRowColumn style={{width: 10}}>{index + 1}</TableRowColumn>
                          <TableRowColumn style={{width: 30}}>{table.name}</TableRowColumn>
                          <TableRowColumn style={{width: 80}}>{table.address}</TableRowColumn>
                          <TableRowColumn style={{width: 50}}>{table.city.name}</TableRowColumn>
                          <TableRowColumn style={{width: 50}}>{table.phone}</TableRowColumn>
                          <TableRowColumn style={{width: 50}}>
									          <button onClick={() => this.props.onUpdate(table.id, table.name, table.address, table.city.id, table.phone, table.description)}>Update</button>
                            <button onClick={() => this.props.onDelete(table.id, table.name)}>Delete</button>
                          </TableRowColumn>
                      </TableRow>
                    )}
                )
              }
            </TableBody>
        </Table>
    )
  }
}
