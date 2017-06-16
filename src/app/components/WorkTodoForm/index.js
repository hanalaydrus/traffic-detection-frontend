import React, { Component } from 'react';
import classNames from 'classnames'
import {RaisedButton, TextField, MenuItem, SelectField, DatePicker} from 'material-ui';
import {orange600, orange500, red500, blue500} from 'material-ui/styles/colors';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import styles from "./styles.scss";

const customContentStyle = {
  width: '40%',
};
const style = {
  orange: {
   borderColor: orange600,
  }
};
const tilesData = [];

class WorkToDoForm extends Component {

  state = {
      projectValue: null,
      selected: [],
      deleted: '',
      open: false,
      task: '',
      url: '',
      hour: '',
      minute: '',
      data: tilesData
  };
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1;
  };

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });
  };
  isHour = (event,data) =>{
      if(data > 99){
        this.setState({hour : 99});
      }
      else if (data <= 99 && data >= 0 ) {
        parseInt(data);
        this.setState({hour : data});
      }
      else{
        this.setState({hour : 0});
      }
  }
  isMinute = (event,data) =>{
      if(data > 59){
        this.setState({minute : 59});
      }
      else if (data <= 59 && data >= 0 ) {
        parseInt(data);
        this.setState({minute : data});
      }
      else{
        this.setState({minute : 0});
      }
  }
  isTask = (event,data) =>{
    this.setState({task:data})
  }
  isUrl = (event,data) =>{
    this.setState({url:data})
  }

  addRow = () => {
    const eta_res = (this.state.hour * 3600) + (this.state.minute * 60)
    tilesData.push({task: this.state.task, url: this.state.url, eta: eta_res})
    this.setState({data: tilesData})
    this.setState({
      task: '',
      url: '',
      hour: '',
      minute: '',
    })
  }
  deleteRow = () => {
    tilesData.splice(this.state.selected,1);
    this.setState({data: tilesData})

  }
  showData = (data) => {
    return data.filter(function (el) {
        return (el);
  });
}

  handleProjectChange = (event, index, value) => this.setState({projectValue: value});

  render() {
    const projectAvailable = [
      <MenuItem key={1} value={1} primaryText="Project 1" />,
      <MenuItem key={2} value={2} primaryText="Project 2" />,
      <MenuItem key={3} value={3} primaryText="Project 3" />,
      <MenuItem key={4} value={4} primaryText="Project 4" />,
      <MenuItem key={5} value={5} primaryText="Project 5" />,
    ];

    const actions = [
      <RaisedButton
        label="Add Task"
        backgroundColor={blue500}
        onTouchTap={this.handleClose}
        style={{marginRight:10}}
        onClick={this.addRow}
      />,
      <RaisedButton
        label="Cancel"
        backgroundColor={red500}
        onTouchTap={this.handleClose}
      />,
    ];
    return (
        <div>
          <div className="todo_form_card">
            <div className="form_card">
                <SelectField
                  className="text_field_todo_form"
                  value={this.state.projectValue}
                  onChange={this.handleProjectChange}
                  floatingLabelText="Choose Project"
                  fullWidth={true}
                  underlineFocusStyle={style.orange}
                >
                  {projectAvailable}
                </SelectField>
                <br/>
                  <DatePicker
                    className="text_field_todo_form"
                    hintText="Date"
                    container="inline"
                    floatingLabelText="Date"
                    fullWidth={true}
                    underlineFocusStyle={style.orange}/>
              <h3 style={{marginBottom:10, color:orange500}}>Todo</h3>
                <div className="task_table" >
                  <Table onRowSelection={this.handleRowSelection}>
                    <TableHeader  >
                      <TableRow>
                        <TableHeaderColumn style={{color:orange500}}>TASK</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {this.state.data.map((tile, index) => (
                      <TableRow selected={this.isSelected(index)}>
                        <TableRowColumn>{tile.task}</TableRowColumn>
                      </TableRow>
                    ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="task_button">
                  <RaisedButton label = "Add Task" backgroundColor={blue500} fullWidth={true} onTouchTap={this.handleOpen}/><br/><br/>
                  <RaisedButton label = "Delete Task" backgroundColor={red500} fullWidth={true} onTouchTap={this.deleteRow}/>
                </div>
                <div className="clear"></div>
                  <TextField
                    hintText="What do you need to discuss"
                    floatingLabelText="What do you need to discuss"
                    multiLine={true}
                    rows={1}
                    rowsMax={4}
                    fullWidth={true}
                    className="text_field_todo_form"
                    underlineFocusStyle={style.orange}
                  />
                <div className="btn_work">
                  <RaisedButton label="Submit" backgroundColor={orange500} className="btn_work_todo" />
                </div>
                <div className="clear"></div>
            </div>
          </div>
          <div>
        <Dialog
          title="Create New Task"
          actions={actions}
          modal={true}
          contentStyle={customContentStyle}
          open={this.state.open}
        >
        <TextField
          hintText="Add your task here"
          floatingLabelText="Add your task here"
          multiLine={true}
          rows={1}
          rowsMax={4}
          fullWidth={true}
          value={this.state.task}
          onChange={this.isTask}
        />
        <TextField
          hintText="Url"
          floatingLabelText="Url"
          fullWidth={true}
          value={this.state.url}
          onChange={this.isUrl}
        />
      <div style={{float:'right'}}>
        Estimation :
        <TextField
          hintText="Hour"
          floatingLabelText="Hour"
          onChange={this.isHour}
          value={this.state.hour}
          style={{width:50, marginRight:10, marginLeft:25}}
        />:
        <TextField
          hintText="Minute"
          floatingLabelText="Minute"
          onChange={this.isMinute}
          value={this.state.minute}
          style={{width:50, marginLeft:10}}
        />
      </div>
        </Dialog>
      </div>
        </div>
    );
  }
}

export default WorkToDoForm;
