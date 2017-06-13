import React, { Component } from 'react';
import { bool, array, object, func } from 'prop-types'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import {
  Checkbox,
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TextField,
  Toggle,
  TableFooter,
  DropDownMenu,
  MenuItem
} from 'material-ui';

import './styles.scss'
import * as actions from './actions';
import * as selectors from './selectors';
import TicketData from '../../../../temp-data/ticketData.json'

class ListTicket extends Component {
  constructor() {
      super();
      this.state = {
        statusChecked: ["todo"],
        value: 1,
        checkSelect: false,
        dataTicket: [],
        fixedHeader: true,
        fixedFooter: false,
        stripedRows: false,
        showRowHover: true,
        selectable: false,
        multiSelectable: false,
        deselectOnClickaway: true,
        enableSelectAll: false,
        showCheckboxes: false,
        height: '100%',
        isDataReceive: false
      };
    }

  handleChangeDropDown = (index, value) => {
    const newData = this.props.data;
    const data = Object.assign({}, newData[index]);
    const tempStatus = data.status
    newData[index].status = value;
    this.props.patchTicketData(newData[index].repository.name, newData[index].number, tempStatus, value, newData)
    this.setState({
      dataTicket: newData
    }, () => {
      this.updateTicketData()
    });
  }

  handleFilter = (status) => {
    this.props.setFilter(status);
  }

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

  labelColor = (labelName) => {
      return labelName === 'feature' ? 'ffe100' :
      labelName === 'tweak' ? '0083ff' :
      labelName === 'bug' ? 'e00000' :
      labelName === 'refactor' ? '07c436' :
      labelName === 'enhancement' ? '6b018c' : 'd5f990'
  }
  labelFontColor = (labelName) => {
      return labelName === 'feature' ? '000000' :
      labelName === 'tweak' ? 'ffffff' :
      labelName === 'bug' ? 'ffffff' :
      labelName === 'refactor' ? 'ffffff' :
      labelName === 'enhancement' ? 'ffffff' : '000000'
  }

  updateTicketData = () => {
    // const newTicketData = this.props.data
    const { data } = this.props
    const newStatusType = this.state.statusChecked
    const ticketData = data.filter((a) => {
      return ((a.status === newStatusType[0]) ||
              (a.status === newStatusType[1]) ||
              (a.status === newStatusType[2]))
    })
    // const ticketData = filter(newTicketData)
    console.log("Tiket Data", ticketData)
    this.setState({
      dataTicket: ticketData
    })
  }

  componentWillMount() {
    this.props.fetchTicketData()
  }

  componentWillReceiveProps() {
    if ((this.props.data.length > 0) && (this.state.isDataReceive == false)) {
      this.setState({
        dataTicket: this.props.data,
        isDataReceive: true
      })
      this.updateTicketData()
    }
  }

  render() {
    // console.log("TODOS", this.props.todos)
    // console.log("INPROGRESSES", this.props.inprogresses)
    // console.log("DONES", this.props.dones)
    // console.log("ARRAY", this.state.statusChecked)
    return (
      <div>
        <div className={ "list_ticket_container" }>
        <div className={ "filter_container" }>
          <div className={"filter_title"}><b>Filter by :</b> </div>
          <div className={ "block" }>
            <Checkbox
              label="To Do"
              checked={ this.props.filters.indexOf("todo") >= 0  }
              style={ "checkbox" }
              onCheck={() => this.handleFilter("todo")}
            />
            <Checkbox
              label="In Progress"
              checked={ this.props.filters.indexOf("inprogress") >= 0 }
              style={ "checkbox" }
              onCheck={() => this.handleFilter("inprogress")}
            />
            <Checkbox
              label="Done"
              checked={ this.props.filters.indexOf("done") >= 0 }
              style={ "checkbox" }
              onCheck={() => this.handleFilter("done")}
            />
          </div>
        </div>
        <div className={ "table_container" }>
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
                <TableHeaderColumn style={{textAlign: 'center', color:'#212121', fontWeight: 'Bold'}}>Repository Name</TableHeaderColumn>
                <TableHeaderColumn style={{textAlign: 'center', color:'#212121', fontWeight: 'Bold'}}>Ticket</TableHeaderColumn>
                <TableHeaderColumn style={{textAlign: 'center', color:'#212121', fontWeight: 'Bold'}}>Label</TableHeaderColumn>
                <TableHeaderColumn style={{textAlign: 'center', color:'#212121', fontWeight: 'Bold'}}>Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
              stripedRows={this.state.stripedRows}
            >
              {this.props.data && this.props.data.filter((value) => {
                const hasFilters = this.props.filters.length > 0;
                const containsStatus = this.props.filters.indexOf(value.status) >= 0;
                return !hasFilters || containsStatus;
              }).map( (row, index) => (
                <TableRow key={index} style={{borderBottom: '1px solid #424040'}}>
                  <TableRowColumn style={{textAlign: 'center'}}><a href={row.repository.url} style={{color: 'white'}}>{row.repository.name}</a></TableRowColumn>
                  <TableRowColumn style={{textAlign: 'center'}}><a href={row.url} style={{color: 'white'}}>#{row.number} {row.title}</a></TableRowColumn>
                  <TableRowColumn style={{textAlign: 'center'}}>
                    {
                       row.labels.map( (content) => (
                        <div style={{
                          fontWeight: 'bold',
                          margin: '4px',
                          float: 'left',
                          borderStyle: 'solid',
                          borderColor: '#' + this.labelColor(content.name),
                          borderRadius: '5px',
                          backgroundColor: '#' + this.labelColor(content.name),
                          color: '#' + this.labelFontColor(content.name)
                        }}>
                            {content.name}
                        </div>
                      ))
                    }
                  </TableRowColumn>
                  <TableRowColumn style={{textAlign: 'center'}}>
                    {
                      <DropDownMenu value={row.status} onChange={(event, number, value)=>this.handleChangeDropDown(index,value)} style={{width: '175px'}}>
                        <MenuItem value={"todo"} primaryText="To Do" />
                        <MenuItem value={"inprogress"} primaryText="In Progress" />
                        <MenuItem value={"done"} primaryText="Done" />
                      </DropDownMenu>
                    }
                  </TableRowColumn>
                </TableRow>
                ))}
            </TableBody>
            <TableFooter
              adjustForCheckbox={this.state.showCheckboxes}
            >
            </TableFooter>
          </Table>
        </div>
      </div>
      </div>
    );
  }
}

/**
 *  Define component PropTypes
 */
ListTicket.propTypes = {
  data: array.isRequired,
  isFetching: bool.isRequired,
  patchTicketData: func.isRequired
}

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  data: selectors.getTicketData(),
  isFetching: selectors.getIsFetching(),
  filters: selectors.getFilters(),
});

/**
 *  Export the component
 */
export default connect(mapStateToProps, actions)(ListTicket);
