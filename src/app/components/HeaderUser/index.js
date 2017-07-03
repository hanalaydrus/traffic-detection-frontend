import React from 'react';
import { func, object } from 'prop-types';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {orange600, orange500} from 'material-ui/styles/colors';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Notifications from 'material-ui/svg-icons/social/notifications';
import FlatButton from 'material-ui/FlatButton';

import './styles.scss';
import { unauthenticateUser } from './../../authGithub/actions';
import { getProfileData } from './../../containers/ListTicket/selectors';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      navStyle: 'nav-full'
    };
  }
  handleGithubLogoutAttempt= () => {
    this.props.unauthenticateUser();
  }

  render() {
    const { profileData } = this.props;
    const { full_name, avatar, email } = profileData;
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
              { Object.keys(this.props.notificationsData).length === 0 ? 
                (<MenuItem> 
                  <div className="notification_menu_item">
                    No Notification
                  </div>
                </MenuItem>)
                :
                (<MenuItem onTouchTap={() => this.props.onNotifTicketClick('refactory-web','89')}> 
                  <div className="notification_menu_item">
                    <b><i>{this.props.notificationsData.from}</i></b> comment on <br/>
                    <b><i>#{this.props.notificationsData.ticket_number} {this.props.notificationsData.ticket_name}</i></b>
                  </div>
                </MenuItem>)
              }
                {/*{ 
                  this.props.notificationsData && this.props.notificationsData.map((row) => (
                    <MenuItem> 
                      <div className="notification_menu_item">
                        <b><i>{row.username}</i></b> comment on <br/>
                        <b><i>#{row.issue_number} {row.issue_title}</i></b>
                      </div>
                    </MenuItem>
                  ))
                }*/}
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
          <div className="clear" />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  unauthenticateUser: func.isRequired,
  profileData: object
};

const mapStateToProps = createStructuredSelector({
  profileData: getProfileData()
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    unauthenticateUser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
