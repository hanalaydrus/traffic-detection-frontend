/**
 * import from library
 */
import React from "react";
import {AppBar} from 'material-ui';
import {orange600, orange500} from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import { RaisedButton,MuiThemeProvider } from 'material-ui';
import MenuItem from 'material-ui/MenuItem';
/**
 * import 
 */
import * as constants from './constants'
import './styles.scss';
const style = {
  margin: 5,
};
export class Drawer extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      campus: ["kampus1" , "kampus2","kampus3"],
      batch:["batch1", "batch2","all batch"],
      value:"all"
    };
    

  }
  getMenu = (data) => {
      return data.map((data,index)=> {
      return <MenuItem value={data.toLowerCase()} primaryText={`${data}`} />
  })}

  handleChange = (event, index, value) => {
    this.setState({value})
  };
  render() {
    return (
      <div className={this.props.drawerStyle}> 
        <MuiThemeProvider className="select-field">
          <SelectField
          floatingLabelText={'Campus'}
          value={this.state.value}
          onChange={this.handleChange}
          >
          {this.getMenu(this.state.campus)}
          </SelectField>
        </MuiThemeProvider>
        <MuiThemeProvider className="select-field">
          <SelectField
          floatingLabelText={'Campus'}
          value={this.state.value}
          onChange={this.handleChange}
          >
          {this.getMenu(this.state.campus)}
          </SelectField>
        </MuiThemeProvider>
      </div>
    );
  }
}

