/**
 * require from depedencies
 */
import React, { Component } from 'react';
import { array, string, object } from 'prop-types';
import { MenuItem, MuiThemeProvider, SelectField } from 'material-ui';

class SelectFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'all'
    };
  }
  getMenu = data => data.map( (data, index) => <MenuItem key={index.toString()} value={data.toLowerCase()} primaryText={`${data}`} />)

  handleChange = (event, index, value) => {
    this.props.onEnterStatus(value);
    this.setState({ value });
  };
  render() {
    const { title, data } = this.props;
    return (
      <div>
        <MuiThemeProvider>
          <SelectField
            floatingLabelText={`${title}`}
            value={this.state.value}
            onChange={this.handleChange}
          >
            {this.getMenu(data.concat('all'))}
          </SelectField>
        </MuiThemeProvider>
      </div>
    );
  }
}

SelectFields.propTypes = {
  onEnterStatus: object.isRequired,
  title: string,
  data: array
};

export default SelectFields;
