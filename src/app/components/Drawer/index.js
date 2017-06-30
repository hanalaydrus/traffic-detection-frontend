/**
 * import from library
 */
import React from 'react';
import { AppBar } from 'material-ui';
import { orange600, orange500 } from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import { RaisedButton,MuiThemeProvider } from 'material-ui';
import MenuItem from 'material-ui/MenuItem';
/**
 * import
 */
import * as constants from './constants';
import { DrawerMenu } from './../DrawerMenu';
import './styles.scss';
const style = {
  margin: 5
};

export class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campus: this.props.campus.concat([ 'all' ]),
      batch: [],
      batchState: 'all',
      value: 'all'
    };
  }
  getMenu = data => param => data.map((data, index) => (data === 'all') ?
    <MenuItem key={index.toString()} value={data} primaryText={`${data}`} />
    : <MenuItem key={index.toString()} value={data[param]} primaryText={`${data[param]}`} />)
  getMenuBatch = campus => value => campus.filter(data => (data.city === 'all') ? false : data.city === value)

  handleChangeCampus = (event, index, value) => {
    this.props.onEnterCampus(value);
    if(value!=='all') {
      this.setState({
        value,
        batch: this.getMenuBatch(this.state.campus)(value)[0].batches.concat('all')
      });
    } else if (value === 'all') {
      this.setState({
        value,
        batch: [ 'all' ]
      });
    }
  }

  handleChangeBatch = (event, index, value) => {
    this.props.onEnterBatch(value);
    this.setState({
      batchState: value
    });
  }

  render() {
    return (
      <div className={this.props.drawerStyle}>
        <MuiThemeProvider className="select-field">
          <SelectField
            floatingLabelText={'Campus'}
            value={this.state.value}
            onChange={this.handleChangeCampus}
          >
            {this.getMenu(this.state.campus)('city')}
          </SelectField>
        </MuiThemeProvider>
        <MuiThemeProvider className="select-field">
          <SelectField
            floatingLabelText={'Batches'}
            value={this.state.batchState}
            onChange={this.handleChangeBatch}
          >
            {this.state.batch.length > 0 ?
          this.state.batch.map((data, index) => <MenuItem key={index.toString()} value={data} primaryText={`${data}`} />)
          : <MenuItem value={'all'} primaryText={'all'} />}
          </SelectField>
        </MuiThemeProvider>
        <DrawerMenu />
      </div>
    );
  }
}
