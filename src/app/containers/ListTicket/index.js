import React, { Component } from 'react';
import {Checkbox,
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

import TicketData from '../../../../temp-data/ticketData.json'

const tableData = TicketData.data

class ListTicket extends Component {
  constructor(props) {
      super(props);
      this.state = {
        statusType: ["todo"],
        data: tableData,
        value: 1,
        fixedHeader: true,
        fixedFooter: false,
        stripedRows: false,
        showRowHover: true,
        selectable: false,
        multiSelectable: false,
        deselectOnClickaway: true,
        enableSelectAll: false,
        showCheckboxes: false,
        height: '100%'
      };
    }

  handleChangeDropDown = (index, value) => {
    const newData = this.state.data;
    newData[index].status = value.target.innerHTML;
    this.setState({
      data: newData
    });
    this.updateTicketData()
  }

  handleFilter = (status) => {
    const newStatusType = this.state.statusType
    const statusIndex = newStatusType.findIndex((a) => { return a === status})
    statusIndex === -1 ? newStatusType.push(status) : newStatusType.splice(statusIndex,1)
    this.setState({
      statusType: newStatusType
    })
    this.updateTicketData()
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
    const newTicketData = tableData
    const newStatusType = this.state.statusType
    const ticketData = newTicketData.filter((a) => {
      return ((a.status === newStatusType[0]) ||
              (a.status === newStatusType[1]) ||
              (a.status === newStatusType[2]))
    })
    this.setState({
      data: ticketData
    })
  }
  componentWillMount() {
    this.updateTicketData()
  }
  render() {
    console.log('statusType',this.state.statusType)
    console.log('data',this.state.data)
    return (
      <div>
        <div className={ "filter_container" }>
          <div className={"filter_title"}><b>Filter by :</b> </div>
          <div className={ "block" }>
            <Checkbox
              defaultChecked = {true}
              label="To Do"
              style={ "checkbox" }
              onCheck={() => this.handleFilter("todo")}
            />
            <Checkbox
              label="In Progress"
              style={ "checkbox" }
              onCheck={() => this.handleFilter("inprogress")}
            />
            <Checkbox
              label="Done"
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
                <TableHeaderColumn style={{textAlign: 'center', color:'#212121', fontWeight: 'Bold'}}>Ticket Number</TableHeaderColumn>
                <TableHeaderColumn style={{textAlign: 'center', color:'#212121', fontWeight: 'Bold'}}>Ticket Name</TableHeaderColumn>
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
              {this.state.data.map( (row, index) => (
                <TableRow key={index} style={{borderBottom: '1px solid #424040'}}>
                  <TableRowColumn style={{textAlign: 'center'}}>{row.repository.name}</TableRowColumn>
                  <TableRowColumn style={{textAlign: 'center'}}>{row.number}</TableRowColumn>
                  <TableRowColumn style={{textAlign: 'center'}}>{row.title}</TableRowColumn>
                  <TableRowColumn style={{textAlign: 'center'}}>
                    {
                       row.labels.map( (content, index) => (
                        <div style={{
                          fontWeight: 'bold',
                          margin: '4px',
                          float: 'left',
                          borderStyle: 'solid',
                          borderColor: '#' + this.labelColor(content.name),
                          borderRadius: '5px',
                          backgroundColor: '#'+ this.labelColor(content.name),
                          color: '#'+ this.labelFontColor(content.name)
                        }}>
                            {content.name}
                        </div>
                      ))
                    }
                  </TableRowColumn>
                  <TableRowColumn style={{textAlign: 'center'}}>
                    {
                      <DropDownMenu value={row.status} onChange={(value)=>this.handleChangeDropDown(index,value)} style={{width: '175px'}}>
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
    );
  }
}

export default ListTicket;
