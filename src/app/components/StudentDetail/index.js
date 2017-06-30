/**
 * import from libary
 */


import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import { green500, blue500,indigo900, orange500, orange600 } from 'material-ui/styles/colors';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Chip from 'material-ui/Chip';
import MainMenu from '../../containers/MainMenu';
import moment from 'moment';
import ActionHome from 'material-ui/svg-icons/editor/mode-edit';
import Avatar from 'material-ui/Avatar';
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
  orange: {
   borderColor: orange600
 },
 content:{
  marginTop:40
 },
  content_full: {
   marginLeft:0,
   padding:40,
   paddingTop:20,
   transition:'1s all ease'
 },
  content_less: {
   marginLeft:250,
   padding:40,
   paddingTop:20,
   transition:'1s all ease'
 },
 chip: {
    margin: 4
  }
};

import './styles.scss';
function handleActive(tab) {
  alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
}

export default class CardExampleControlled extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      contentStyle: styles.content_less,
      controlledDate: moment('2014-11-07T21:20:15').toDate()
    };
  }

  handleDate = (event, date) => {
    console.log('this is date',date);
    this.setState({
      controlledDate: date
    });
  };

  handleExpandChange = (expanded) => {
    this.setState({ expanded: expanded });
  };

  handleToggle = (event, toggle) => {
    this.setState({ expanded: toggle });
  };

  handleExpand = () => {
    this.setState({ expanded: true });
  };

  handleReduce = () => {
    this.setState({ expanded: false });
  };
  handleChange = (event, index, value) => this.setState({ value });
render() {
  return (
<MainMenu > 
  <div style={this.state.contentStyle}> 
  <Tabs>
    <Tab label="Profile" >
      <div style={styles.content} >
        <Row around="xs" >      
        <Col xs={6}>
        <ToolbarGroup >
          <TextField
            defaultValue="Aji Lantang Mardika"
            floatingLabelText="Name "
          />
          <ActionHome />
        </ToolbarGroup>
         <ToolbarGroup>
            <SelectField
              floatingLabelText="Campus"
              value={1}
              onChange={this.handleChange}
            >
              <MenuItem value={1} primaryText="Eduplex, bandung" />
              <MenuItem value={2} primaryText="Akademos, jakarta" />
              <MenuItem value={3} primaryText="Cak har, surabaya" />
              <MenuItem value={4} primaryText="Tuminem, jogja" />
              <MenuItem value={5} primaryText="Seragen, solo" />
          </SelectField>
          <ActionHome />
         </ToolbarGroup>
          <ToolbarGroup>
            <SelectField
            floatingLabelText="Batch"
            value={1}
            onChange={this.handleChange}
          >
            <MenuItem value={1} primaryText="#1-Alpacino" />
            <MenuItem value={2} primaryText="#2-Abdul bacan" />
            <MenuItem value={3} primaryText="#3-Azis idola" />
          </SelectField>
            <ActionHome />  
          </ToolbarGroup>
          <ToolbarGroup>
            <DatePicker
            hintText="Birthday"
            value={this.state.controlledDate}
            onChange={this.handleDate}
          /><ActionHome />
          </ToolbarGroup>          
          <ToolbarGroup>
            <TextField
            defaultValue="Sawangan, Depok"
            floatingLabelText="Address "
            />
            <ActionHome />
          </ToolbarGroup>
          <ToolbarGroup>
            <TextField
            defaultValue="ajilantang@gmail.com"
            floatingLabelText="Email "
            disabled={false}
            />
            <ActionHome />
          </ToolbarGroup>
          
          <p>Status</p>
          <ToolbarGroup>
            <Chip
              backgroundColor={blue500}
              style={styles.chip}
              >
              <Avatar size={32} color={blue500} backgroundColor={indigo900}>
                Pe
              </Avatar>
              Status:Pending
            </Chip>
            <ActionHome />    
          </ToolbarGroup>
          
        </Col >
      </Row>
      </div>
    </Tab>
    
  </Tabs>
  </div>
</MainMenu >
  );
}
}

/*import React, { Component } from 'react';
import classNames from 'classnames'
import {RaisedButton, TextField, MenuItem, SelectField, DatePicker} from 'material-ui';
import {orange600, orange500, red500, blue500} from 'material-ui/styles/colors';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import styles from "./styles.scss";
import MainMenu from '../../containers/MainMenu'
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
  constructor(){
    super(...arguments);
    this.state = {
      dataProfile: {
                "id": 1,
                "full_name": "Andi Herman",
                "address": "Dago, Bandung",
                "birthday": "May 20, 1994",
                "phone": "08123456788",
                "email": "andy@gmail.com",
                "status": "pending",
                "batch_id": 2,
                "batch": {
                    "id": 2,
                    "code_name": "Basilischi",
                    "campus_id": 1
                },
                "campus": {
                    "id": 1,
                    "name": "Eduplex",
                }
            }
        
    }
  }
  render() {
    return (
      <MainMenu >
          
      </MainMenu>
    );
  }
}

export default WorkToDoForm;*/

