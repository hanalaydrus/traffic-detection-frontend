import React, { Component } from 'react';
import { bool, array, object, func } from 'prop-types'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import Loader from 'react-loader'
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

class ListTicket extends Component {
  constructor() {
      super();
      this.state = {
        statusChecked: ["todo"],
        value: 1,
        checkSelect: false,
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

  handleChangeDropDown = (index, value, ticketNumber) => {
    const newData = this.props.data.tickets;
    const data = newData.find((tckData) => {return tckData.number === ticketNumber})
    const tempStatus = data.status
    data.status = value;
    this.props.patchTicketData(data.repository.name, data.number, tempStatus, value, newData)
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
    const { tickets } = this.props.data
    const newStatusType = this.state.statusChecked
    const ticketData = tickets.filter((a) => {
      return ((a.status === newStatusType[0]) ||
              (a.status === newStatusType[1]) ||
              (a.status === newStatusType[2]))
    })
    this.setState({
      dataTicket: ticketData
    })
  }

  componentWillMount() {
    this.props.fetchTicketData()
  }

  render() {
    console.log('render props',this.props.data.tickets)
    if (this.props.isFetching) {
      return <Loader type="line-scale" active />
    }
    return (
      <div>
        <div className={ "list_ticket_container" }>
        <div className={ "score_and_filter" }>
          <div className={ "filter_container" }>
            <div className={"filter_title"}><b>Filter by</b> </div>
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
          <div className={ "score_container "}>
            <div className={"score_title"}><b>Your Score</b> </div>
            <div className={"score"}><b>{this.props.data.total_score}</b> </div>
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
              {this.props.data.tickets && this.props.data.tickets.filter((value) => {
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
                      <DropDownMenu value={row.status} onChange={(event, number, value)=>this.handleChangeDropDown(index,value,row.number)} style={{width: '175px'}}>
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
