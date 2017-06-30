/**
 * import from libary
 */
import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import { blue500,indigo900, orange600 } from 'material-ui/styles/colors';
import { Row, Col } from 'react-flexbox-grid';
import { ToolbarGroup } from 'material-ui/Toolbar';
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

export default class CardExampleControlled extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      contentStyle: styles.content_less,
      controlledDate: moment('2014-11-07T21:20:15').toDate()
    };
  }

  handleDate = (event, date) => {
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

  handleChange = (event, index, value) => {
    this.setState({ value });
  };

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

