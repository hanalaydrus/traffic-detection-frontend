import React from 'react';
import { orange600, orange500 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './styles.scss';
import { unauthenticateUser } from './../../authGithub/actions';
import { getProfileData } from './../../containers/ListTicket/selectors';


const style = {
  largeIcon: {
    width: 30,
    height: 30,
    color: '#444'
  },
  large: {
    width: 50,
    height: 50,
    padding: 5
  }
};

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
    return (
      <div className="navigation">
        <div className={this.state.navStyle}>
          <div className="logo">
            <img src="/images/Refactory.png" style={{ height: 40, marginTop: 4, marginLeft: 30 }} />
          </div>
          <div className="menu">
                <div className="float_left" style={{ padding:'15px 5px' }}>
                  {this.props.profileData.full_name}
                </div>
               <IconMenu
                  iconButtonElement={<IconButton style={{ marginTop:-8, marginRight:30 }}><img src={this.props.profileData.avatar} height="40" /></IconButton>}
                  anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                  targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                  style={{ marginRight:30 }}
                >
                  <MenuItem primaryText={this.props.profileData.email} />
                  <MenuItem primaryText="Log out" onClick={ this.handleGithubLogoutAttempt } />
                </IconMenu>
          </div>
          <div className="clear" />
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
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
