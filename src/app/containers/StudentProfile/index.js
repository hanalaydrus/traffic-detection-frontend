/**
 * import from libary
 */


import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import Slider from 'material-ui/Slider'
import FlatButton from 'material-ui/FlatButton'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'
import {green500, blue500, lightBlue500, indigo900, orange500, orange600, grey500, red500} from 'material-ui/styles/colors'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import { Grid, Row, Col } from 'react-flexbox-grid'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import Chip from 'material-ui/Chip'
import moment from 'moment'
import SettingIcon from 'material-ui/svg-icons/editor/mode-edit'
import SaveIcon from 'material-ui/svg-icons/content/save'
import CancelIcon from 'material-ui/svg-icons/navigation/cancel'
import Avatar from 'material-ui/Avatar'
import { bool, array, object } from 'prop-types'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Loader from 'react-loader'

import MainMenu from '..//MainMenu'
import response from './data'
import * as actions from './actions'
import * as selectors from './selectors'
import {fetchCampusesData} from './../CampusListTable/actions'
import {getIsFetchingCampuses, getCampusesData} from './../CampusListTable/selectors'

const statuses = ['pending','interview','preparation','failed','discontinue','complete']

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
    marginBottom:16,
    cursor:'pointer',
    width: 200
  },
  chip2: {
    margin: 4,
    backgroundColor: lightBlue500,
    width: 200
  },
  chip3: {
    margin: 4,
    backgroundColor: green500,
    width: 200,
    marginBottom:10,
  },
  chip4: {
    margin: 4,
    backgroundColor: red500,
    width: 200
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

class StudentProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contentStyle: styles.content_less,
      full_name: '',
      campus_id: 0,
      batch_id: 0,
      birthday: '2017-10-10',
      address: '',
      email: '',
      status: 'pending',
      isChange: true
    }
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
  onChangeCampusValue = (state) => (event, index, value) => {
    this.props.fetchBatchData(value)
      this.setState({
        [state]:parseInt(value)
      })
  }
  onChangeBatchValue = (state) => (event, index, value) => {
      this.setState({
        [state]:parseInt(value)
      })
  }
  onSubmit = (full_name, campus_id, batch_id, birthday, address, email, status) => {
    this.props.fetchBatchData(campus_id)
    this.setState({
      isChange: false,
      full_name: full_name,
      campus_id: parseInt(campus_id),
      batch_id: parseInt(batch_id),
      birthday: birthday,
      address: address,
      email: email,
      status: status,
    })

  }
  onSubmitStatus = (value) => {
    this.setState({
      status: value,
    })
  }
  cancelUpdate = () => {
    this.setState({
      isChange: true,
    })
  }
  updateStudent = () => {
    const { full_name, campus_id, batch_id, birthday, address, email, status } = this.state
    const idParticipant = this.props.match.params.idParticipant
    const idStudent = this.props.match.params.idStudent
    this.setState({
      isChange: true,
    })
    this.props.updateStudentData(idParticipant, idStudent, full_name, batch_id, moment(birthday).toDate(), address, email, status)
    this.props.fetchStudentData(this.props.match.params.idParticipant, this.props.match.params.idStudent)
  }
  componentWillMount() {
    this.props.fetchStudentData(this.props.match.params.idParticipant, this.props.match.params.idStudent)
    this.props.fetchCampusesData()
  }

  render(){
    return (
      <MainMenu >
        <div style={this.state.contentStyle}>
          {this.props.isFetchingStudent || this.props.isFetchingCampuses ?
          (<Loader type="line-scale" color="#fff" active />)
          :this.props.studentData.map((row, index) =>(
        <Tabs key={index}>
          <Tab label="Profile" >
            <div style={styles.content} >
              <Row around="xs" >
                <div >
                  {this.state.isChange ?
                    (<Chip style={styles.chip2} onTouchTap={() => this.onSubmit(row.contact.full_name, row.batch.campus_id, parseInt(row.batch_id), row.contact.birthday, row.contact.address, row.contact.email, row.contact.status)}>
                      <Avatar icon={<SettingIcon/>} />
                      Setting information
                    </Chip>):
                    (
                      <div>
                        <Chip style={styles.chip3}  onTouchTap={this.updateStudent}>
                        <Avatar icon={<SaveIcon/>} />
                        Update information
                      </Chip>
                      <Chip style={styles.chip4}  onTouchTap={this.cancelUpdate}>
                        <Avatar icon={<CancelIcon/>} />
                        Cancel
                      </Chip>
                      </div>
                  )}
                </div>
              <Col xs={5}>
                <TextField
                  value={this.state.isChange ? row.contact.full_name : this.state.full_name}
                  floatingLabelText="Name"
                  onChange={this.onChangeValue('full_name')}
                  underlineDisabledStyle={{backgroundColor:'white',fontFamily:'ubuntu'}}
                  disabled={this.state.isChange}
                />
                <SelectField
                  floatingLabelText="Campus"
                  value={this.state.isChange ? parseInt(row.batch.campus_id) : this.state.campus_id}
                  onChange={this.onChangeCampusValue('campus_id')}
                  underlineDisabledStyle={{backgroundColor:'white',fontFamily:'ubuntu'}}
                  disabled={this.state.isChange}
                >
                  {this.props.campusesData.map((row2, index2) =>(
                    <MenuItem key={index2} value={row2.id} primaryText={row2.name + ", " + row2.city.name}/>
                  ))}
                </SelectField>
                {
                  this.props.isFetchingBatch ?
                  <div style={{height:39,width:256}}>
                    <Loader className="cbb_spin" type="line-scale" color="#fff" active />
                  </div> :
                  <SelectField
                    floatingLabelText="Batch"
                    value={this.state.isChange ? parseInt(row.batch_id) : this.state.batch_id}
                    onChange={this.onChangeBatchValue('batch_id')}
                    underlineDisabledStyle={{backgroundColor:'white',fontFamily:'ubuntu'}}
                    disabled={this.state.isChange}
                    >
                    {this.state.isChange ?
                      (<MenuItem value={parseInt(row.batch_id)} primaryText={"#"+row.batch.number+" "+row.batch.codename} />):
                      this.props.batchData.map((row3, index3) =>(
                        <MenuItem key={index3} value={parseInt(row3.id)} primaryText={"#"+row3.number+" "+row3.codename} />
                      ))
                    }
                  </SelectField>
                }

                <DatePicker
                  hintText="Birthday"
                  value={moment(this.state.isChange ? row.contact.birthday : this.state.birthday).toDate()}
                  onChange={this.onChangeValue('birthday')}
                  underlineDisabledStyle={{backgroundColor:'white',fontFamily:'ubuntu'}}
                  disabled={this.state.isChange}
                />
                <TextField
                  value={this.state.isChange ? row.contact.address : this.state.address}
                  floatingLabelText="Address "
                  underlineDisabledStyle={{backgroundColor:'white',fontFamily:'ubuntu'}}
                  onChange={this.onChangeValue('address')}
                  disabled={this.state.isChange}
                  />
                <TextField
                  value={this.state.isChange ? row.contact.email : this.state.email}
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
                      {row.contact.status.substring(0,2)}
                    </Avatar>
                    Status: {row.contact.status}
                  </Chip>
                  :
                  <div>
                    {statuses.map((statusItem,index) => (
                      <Chip
                        key={index+statusItem}
                        backgroundColor={statusItem === this.state.status ? blue500 : grey500}
                        style={styles.chip}
                        onClick={() => this.onSubmitStatus(statusItem)}
                        >
                        <Avatar size={32} color={blue500} backgroundColor={indigo900}>
                          {statusItem.substring(0, 2)}
                        </Avatar>
                        Status: {statusItem}
                      </Chip>
                    ))}
                  </div>
                }

              </Col >
            </Row>
            </div>
          </Tab>
        </Tabs>
      ))}
        </div>
      </MainMenu >
      )
  }
}
/**
 *  Define component PropTypes
 */
StudentProfile.propTypes = {
  studentData: array.isRequired,
  isFetchingStudent: bool.isRequired,
  campusesData: array.isRequired,
  isFetchingCampuses: bool.isRequired,
  batchData: array.isRequired,
  isFetchingBatch: bool.isRequired,
}

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  studentData: selectors.getStudentData(),
  isFetchingStudent: selectors.getIsFetchingStudent(),
  campusesData: getCampusesData(),
  isFetchingCampuses: getIsFetchingCampuses(),
  batchData: selectors.getBatchData(),
  isFetchingBatch: selectors.getIsFetchingBatch(),
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      ...actions,
      fetchCampusesData
    }, dispatch)
}
/**
 *  Export the component
 */
export default connect(mapStateToProps, mapDispatchToProps)(StudentProfile);
