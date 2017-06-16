import React, { Component } from 'react';
import { bool, array, object, func } from 'prop-types'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import Loader from 'react-loader'
import RichTextEditor from 'react-rte'
import marked from 'marked'
import moment from 'moment'
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
  MenuItem,
  Drawer,
  RaisedButton,
  FlatButton,
  Card,
  CardHeader,
  CardText,
  CardTitle
} from 'material-ui';

import './styles.scss'
import * as actions from './actions';
import * as selectors from './selectors';
import Dropdown from '../../components/Dropdown';


import Header from './../../components/HeaderUser'

const STATUS_TICKET = [
  {value:'todo',text:'To Do'},
  {value:'inprogress',text:'In Progress'},
  {value:'done',text:'Done'}
]

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
        selectable: true,
        multiSelectable: false,
        deselectOnClickaway: true,
        enableSelectAll: false,
        showCheckboxes: false,
        height: '100%',
        isDataReceive: false,
        drawerOpen: false,
        valueMarkdown: RichTextEditor.createEmptyValue(),
        selectedProjectName: '',
        selectedTicketNumber: -1
      };
    }

  handleChangeDropDown = (value, ticketNumber) => {
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

  onMarkdownChange = (valueMarkdown) => {
    this.setState({valueMarkdown});
    if (this.props.onMarkdownChange) {
      this.props.onMarkdownChange(
        valueMarkdown.toString('html')
      );
    }
  };

  handleDrawerToggle = (projectName,ticketNumber) => {
    this.props.fetchCommentData(projectName,ticketNumber)
    this.setState({
      drawerOpen: !this.state.drawerOpen,
      selectedProjectName: projectName,
      selectedTicketNumber: ticketNumber
    })
  }

  handleSubmitComment = (projectName, ticketNumber, body) => {
    this.props.submitCommentData(projectName, ticketNumber, body)
    this.props.fetchCommentData(projectName,ticketNumber)
    this.setState({
      valueMarkdown: RichTextEditor.createEmptyValue()
    })
  }

  handleRefreshComment = (projectName, ticketNumber) => {
    this.props.fetchCommentData(projectName,ticketNumber)
  }

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
    if (this.props.isFetching) {
      return <Loader type="line-scale" color="#fff" active />
    }
    return (
      <div>
        <Header />
        <div className={ "list_ticket_container" }>
        <div className={ "score_and_filter" }>
          <div className={ "filter_container" }>
            <div className={"filter_title"}><b>Filter by</b> </div>
            <div className={ "block" }>
              <Checkbox
                label="To Do"
                checked={ this.props.filters.indexOf("todo") >= 0 || this.props.filters.indexOf("inprogress") >= 0}
                style={{marginRight:30}}
                onCheck={() => this.handleFilter("todo")}
              />
              <Checkbox
                label="Done"
                checked={ this.props.filters.indexOf("done") >= 0 }
                style={{}}
                onCheck={() => this.handleFilter("done")}
              />
            </div>
          </div>
          <div className={ "score_container "}>
            <div className={"score_title"}><b>Your Score</b> </div>
            <div className={"score"}><b>{this.props.data.total_score + " pts"}</b> </div>
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
                <TableHeaderColumn style={{textAlign: 'center', color:'#212121', fontWeight: 'Bold'}}>Repository</TableHeaderColumn>
                <TableHeaderColumn style={{textAlign: 'center', color:'#212121', fontWeight: 'Bold'}}>Ticket</TableHeaderColumn>
                <TableHeaderColumn style={{textAlign: 'center', color:'#212121', fontWeight: 'Bold', width: '120px'}}>Type</TableHeaderColumn>
                <TableHeaderColumn style={{textAlign: 'center', color:'#212121', fontWeight: 'Bold', width: '120px'}}>Status</TableHeaderColumn>
                <TableHeaderColumn style={{textAlign: 'center', color:'#212121', fontWeight: 'Bold'}}>Change Status</TableHeaderColumn>
                <TableHeaderColumn style={{textAlign: 'center', color:'#212121', fontWeight: 'Bold'}}>Action</TableHeaderColumn>
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
                  <TableRowColumn style={{textAlign: 'center', width: '120px'}}>
                    {
                       row.labels.map( (content, index2) => (
                         ((content.name !== 'inprogress') &&
                          (content.name !== 'todo') &&
                          (content.name !== 'done')
                         ) ?
                       ( <div style={{
                          fontWeight: 'bold',
                          margin: '4px',
                          float: 'left',
                          borderStyle: 'solid',
                          borderColor: '#' + this.labelColor(content.name),
                          borderRadius: '5px',
                          backgroundColor: '#' + this.labelColor(content.name),
                          color: '#' + this.labelFontColor(content.name)
                        }}
                        key={index2}>
                            {content.name}
                        </div> ) : ' '
                      ))
                    }
                  </TableRowColumn>
                  <TableRowColumn style={{textAlign: 'center', width: '120px'}}>
                    {
                       row.labels.map( (content) => (
                         ((content.name === 'inprogress') ||
                          (content.name === 'todo') ||
                          (content.name === 'done')
                         ) ?
                        (<div style={{
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
                        </div> ) : ' '
                      ))
                    }
                  </TableRowColumn>
                  <TableRowColumn style={{textAlign: 'center'}}>
                    {
                      <Dropdown currentValue={row.status} onChangeFunction={() => this.handleChangeDropDown(value,row.number)} menuItemValues={STATUS_TICKET} width={'175px'}/>
                    }
                  </TableRowColumn>
                  <TableRowColumn style={{textAlign: 'center'}}>
                    <RaisedButton
                      label="DISCUSS"
                      onTouchTap={ () => this.handleDrawerToggle(row.repository.name,row.number) }
                    />
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
        <Drawer
          open={this.state.drawerOpen}
          width={600}
          docked={false}
          onRequestChange={(drawerOpen) => this.setState({drawerOpen})}
        >
          <div className={"markdown_container"} >
            <div className={"show_comment"}>
            {this.props.isFetchingComment ?
              (<Loader type="line-scale" color="#fff" active />) :
              (this.props.commentData.comments && this.props.commentData.comments.map( (row, index) => (
                <Card style={{padding: 4}}>
                  <div className={"card_header"}>
                    <CardHeader
                      title={row.user.login + " commented on #" + this.props.commentData.number + " " + this.props.commentData.title}
                      subtitle={moment(row.created_at, ["YYYY", moment.ISO_8601]).format("MMMM Do YYYY hh:mm")}
                      avatar={row.user.avatar_url}
                      titleColor='#000'
                      subtitleColor="#000"
                    />
                  </div>
                  <CardText>
                    <div className={ "cardTextContainer" }>
                      <div dangerouslySetInnerHTML={{__html:marked(row.body)}}/>
                    </div>
                  </CardText>
                </Card>
                )))}
            </div>
            <div className={"markdown_editor"} >
              <div className={"markdown_editor_detail"}>
                <RichTextEditor
                  value={this.state.valueMarkdown}
                  onChange={this.onMarkdownChange}
                />
              </div>
              <div className={"markdown_button_submit"} >
                <FlatButton
                  label="Refresh"
                  primary={true}
                  onClick={
                    () => this.handleRefreshComment(
                      this.state.selectedProjectName,
                      this.state.selectedTicketNumber
                  )}
                />
                <RaisedButton
                  backgroundColor="#f9bb00"
                  labelColor="#000"
                  label="SUBMIT"
                  onClick={
                    () => this.handleSubmitComment(
                      this.state.selectedProjectName,
                      this.state.selectedTicketNumber,
                      this.state.valueMarkdown.toString('markdown')
                  )}
                />
              </div>
            </div>
          </div>
        </Drawer>
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
  patchTicketData: func.isRequired,
  onMarkdownChange: func
}

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  data: selectors.getTicketData(),
  isFetching: selectors.getIsFetching(),
  filters: selectors.getFilters(),
  isFetchingComment: selectors.getIsFetchingComment(),
  commentData: selectors.getCommentData()
});

/**
 *  Export the component
 */
export default connect(mapStateToProps, actions)(ListTicket);
