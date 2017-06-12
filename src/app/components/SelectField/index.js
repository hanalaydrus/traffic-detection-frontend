/**
 * require from depedencies
 */
import React, { Component } from 'react';
import { MenuItem, MuiThemeProvider,SelectField } from 'material-ui';

class SelectFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:'all',
    };
  }
  getMenu = (data) => {
      return data.map((data,index)=> {
      return <MenuItem key={index.toString()} value={data.toLowerCase()} primaryText={`${data}`} />
  })}

  handleChange = (event, index, value) => {
    this.props.onEnterStatus(value);
    this.setState({value})
  };
  render() {
    
    return (
      <div> 
        <MuiThemeProvider>
          <SelectField
          floatingLabelText={`${this.props.title}`}
          value={this.state.value}
          onChange={this.handleChange}
          >
          {this.getMenu(this.props.data.concat('all'))}
          </SelectField>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default SelectFields;