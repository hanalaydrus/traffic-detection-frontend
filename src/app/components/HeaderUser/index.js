import React from "react"
import {orange600, orange500} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import FlatButton from 'material-ui/FlatButton'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './styles.scss';
import { unauthenticateUser } from './../../authGithub/actions'


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
    constructor() {
    super()
    this.state = {
      navStyle: 'nav-full',
    }

  }
  handleGithubLogoutAttempt= () => {
    console.log("OnClick");
    this.props.unauthenticateUser()
  }
  /*
    handleChange = () => {
      const Nav = this.props.navStyle === 'nav' ? 'nav-full' : 'nav';
      const Draw = this.props.drawerStyle === 'menu-drawer' ? 'menu-lost' : 'menu-drawer';
      this.props.onClick(Nav, Draw);
    }*/
    render(){
      console.log("props header ", this.props);
    return (
      <div className="navigation">
        <div className={this.state.navStyle}>
          <div className="logo">
            <img src="/images/Refactory.png" style={{height:40, marginTop:4, marginLeft:30}}/>
          </div>
          <div className="menu">
               <IconMenu
                  iconButtonElement={<IconButton><img src="/images/Refactory-icon.png" style={{height:40, marginTop:0, marginLeft:30}}/></IconButton>}
                  anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                  targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  style={{marginRight:30}}
                >
                  <MenuItem primaryText="Username" />
                  <MenuItem primaryText="Log out" onClick={ this.handleGithubLogoutAttempt }/>
                </IconMenu>
          </div>
          <div className="clear"></div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      unauthenticateUser
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(Header)
