/**
 * import from libary
 */


import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import {green500, blue500,indigo900, orange500, orange600} from 'material-ui/styles/colors';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Chip from 'material-ui/Chip';
import moment from 'moment'
import SettingIcon from 'material-ui/svg-icons/editor/mode-edit';
import Avatar from 'material-ui/Avatar';

import MainMenu from '../../containers/MainMenu';
import response from './constants'
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  orange: {
   borderColor: orange600,
 },
 content:{
  marginTop:40,
 },
  content_full: {
   marginLeft:0,
   padding:40,
   paddingTop:20,
   transition:'1s all ease',
 },
  content_less: {
   marginLeft:250,
   padding:40,
   paddingTop:20,
   transition:'1s all ease',
 },
 chip: {
    margin: 4,
    marginTop:4,
    marginBottom:16
  },
  chip2: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  }
};


import './styles.scss'
function handleActive(tab) {
  alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
}

export default class CardExampleControlled extends React.Component {

  constructor(props) {
    super(props);
    this.state = Object.assign(response.data,{
      expanded: false,
      contentStyle: styles.content_less,
      controlledDate: moment('2014-11-07T21:20:15').toDate(),
      isChange:true,
    })
    this.statuses = ["interview","pending","preparation","failed","discontinue","complete"]
  }

  handleDate = (event, date) => {
    this.setState({
      controlledDate: date,
    });
  };

  onChangeValue = (state) => (event,name) => {
      this.setState({
        [state]:name
      }) 
  }
  onSubmitStatus  = (value) =>{
    this.setState({
      status:value
    })
  }
  onSubmit = (event) => {
   this.setState({
     isChange:!this.state.isChange
   })
  }
  getBatch = (data) => (campusid) => {
  return data.filter((data) => data.campus_id === campusid )
  }
  handleChange = (state) => (event, index, value) => this.setState({[state]:value});
  render(){
    const { full_name ,batch_id, campus_id, address, birthday, phone, email, status, batch, campus ,allCampus } = this.state
    const batches = this.getBatch(campus)(campus_id)[0]["batch"]
    return (
      <MainMenu > 
        <div style={this.state.contentStyle}> 
        <Tabs>
          <Tab label="Profile" >
            <div style={styles.content} >
              <Row around="xs" >
                <div >
                  <Chip style={styles.chip2} onTouchTap={this.onSubmit}>
                    <Avatar icon={<SettingIcon/>} />
                    Setting information
                  </Chip>
                </div>
              <Col xs={5}>
                <TextField
                  defaultValue={full_name}
                  floatingLabelText="Name "
                  onChange={this.onChangeValue('full_name')}
                  underlineDisabledStyle={{backgroundColor:'white',fontFamily:'ubuntu'}}
                  disabled={this.state.isChange}
                />
                  <SelectField
                    floatingLabelText="Campus"
                    value={campus_id}
                    onChange={this.handleChange('campus_id')}
                    underlineDisabledStyle={{backgroundColor:'white',fontFamily:'ubuntu'}}
                    disabled={this.state.isChange}
                  >
                  {campus.map((data,index)=><MenuItem key={index+data} value={data.campus_id} primaryText={`${data.campus_name}`} />)}
                </SelectField>
                  <SelectField
                  floatingLabelText="Batch"
                  value={batch_id}
                  onChange={this.handleChange('batch_id')}
                  underlineDisabledStyle={{backgroundColor:'white',fontFamily:'ubuntu'}}
                  disabled={this.state.isChange}
                > 
                  {
                    batches.map((value,index) =><MenuItem key={value+index} value={value.id} primaryText={value.batch_name} /> )
                  }
                </SelectField>
              
                <DatePicker
                  hintText="Birthday"
                  value={moment(birthday).toDate()}
                  onChange={this.onChangeValue('birthday')}
                  underlineDisabledStyle={{backgroundColor:'white',fontFamily:'ubuntu'}}
                  disabled={this.state.isChange}
                />
                <TextField
                  defaultValue={address}
                  floatingLabelText="Address "
                  underlineDisabledStyle={{backgroundColor:'white',fontFamily:'ubuntu'}}
                  onChange={this.onChangeValue('address')}
                  disabled={this.state.isChange}
                  />
                <TextField
                  defaultValue={email}
                  floatingLabelText="Email "
                  underlineDisabledStyle={{backgroundColor:'white',fontFamily:'ubuntu'}}
                  onChange={this.onChangeValue('email')}
                  disabled={this.state.isChange}
                  />
                  <p>Status</p>
                {(this.state.isChange) ?
                  <Chip
                    backgroundColor={blue500}
                    style={styles.chip}
                    >

                    <Avatar size={32} color={blue500} backgroundColor={indigo900}>
                      {status.substring(0,2)}
                    </Avatar>
                    Status: {status}
                  </Chip> 
                  :
                  <div>
                    {this.statuses.map((statusItem,index) => (
                      <Chip
                        key={index+statusItem}
                        backgroundColor={blue500}
                        style={styles.chip}
                        onClick={() => this.onSubmitStatus(statusItem)}
                        >
                        <Avatar size={32} color={blue500} backgroundColor={indigo900}>
                          {statusItem.substring(0, 2)}
                        </Avatar>
                        Status: {statusItem.substring(0,1).toUpperCase() + statusItem.substring(1)}
                      </Chip>
                    ))}
                  </div> 
                }  
                  
              </Col >
            </Row>
            </div>
          </Tab> 
        </Tabs>
        </div>
      </MainMenu >
      )
  }
}


