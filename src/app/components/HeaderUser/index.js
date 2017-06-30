import React from 'react';
import { func, object } from 'prop-types';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

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
        <div className={this.state.navStyle}>
          <div className="logo">
            <img src="/images/Refactory.png" style={{ height: 40, marginTop: 4, marginLeft: 30 }} />
          </div>
          <div className="menu">
                <div className="float_left" style={{ padding:'15px 5px' }}>
                  {full_name}
                </div>
               <IconMenu
                  iconButtonElement={<IconButton style={{ marginTop:-8, marginRight:30 }}><img src={avatar} height="40" /></IconButton>}
                  anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                  targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                  style={{ marginRight:30 }}
                >
                  <MenuItem primaryText={email} />
                  <MenuItem primaryText="Log out" onClick={ this.handleGithubLogoutAttempt } />
                </IconMenu>
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
