import React from "react"
import {orange600, orange500} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import Notifications from 'material-ui/svg-icons/social/notifications'
import FlatButton from 'material-ui/FlatButton'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './styles.scss';
import { unauthenticateUser } from './../../authGithub/actions'
import { getProfileData } from './../../containers/ListTicket/selectors'
class Header extends React.Component {

  handleGithubLogoutAttempt= () => {
    this.props.unauthenticateUser()
  }

  render(){
    return (
      <div className="navigation">
        <div className="nav_user">
          <div className="logo">
            <img src="/images/Refactory.png" style={{height:34}}/>
          </div>
          <div className="menu">
            <div className="childmenu">
              <IconMenu
                  iconButtonElement={<IconButton className="icon_notification"><Notifications />{this.props.isNewNotificationData ? <div className="red_notification"/> : <div /> }</IconButton>}
                  anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  onTouchTap= {() => this.props.onNotifOpen(false)}
              >
              { this.props.notificationsData.length === 0 ? 
                (<MenuItem> 
                  <div className="notification_menu_item">
                    No Notification
                  </div>
                </MenuItem>)
                :
                this.props.notificationsData.map( (val, i) => 
                  (<MenuItem key={i} onTouchTap={() => this.props.onNotifTicketClick('refactory-web','89')}> 
                    <div className="notification_menu_item">
                      <b><i>{val.from}</i></b> comment on <br/>
                      <b><i>#{val.ticket_number} {val.ticket_name}</i></b>
                    </div>
                  </MenuItem>) 
                )
              }
              </IconMenu>
            </div>
            <div className="childmenu">
                <div className="float_left" style={{padding:'15px 5px'}}>
                  {this.props.profileData.full_name}
                </div>
              <IconMenu
                  iconButtonElement={<IconButton style={{marginTop:-6, marginRight:30}}><img src={this.props.profileData.avatar}/></IconButton>}
                  anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                  <MenuItem primaryText={this.props.profileData.email} style={{fontSize:14}}></MenuItem>
                  <MenuItem primaryText="Log out" style={{fontSize:14}} onClick={ this.handleGithubLogoutAttempt }/>
                </IconMenu>
            </div>
          </div>
          <div className="clear"></div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  profileData: getProfileData()
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      unauthenticateUser
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
