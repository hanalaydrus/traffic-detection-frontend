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


const style = {
  largeIcon: {
    width: 30,
    height: 30,
    color:'#444',
  },
  large: {
    width: 50,
    height: 50,
    padding:5,
  },
};

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
                  iconButtonElement={<IconButton><Notifications /></IconButton>}
                  anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                { 
                  this.props.notificationsData && this.props.notificationsData.map((row) => (
                    <MenuItem> 
                      <div className="notification_menu_item">
                        <b><i>{row.username}</i></b> comment on <br/>
                        <b><i>#{row.issue_number} {row.issue_title}</i></b>
                      </div>
                    </MenuItem>
                  ))
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
