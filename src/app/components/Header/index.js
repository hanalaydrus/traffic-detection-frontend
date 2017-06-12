import React from "react";
import {orange600, orange500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import FlatButton from 'material-ui/FlatButton';
import './styles.scss';
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

export class Header extends React.Component {

    handleChange = () => {
      const Nav = this.props.navStyle === 'nav' ? 'nav-full' : 'nav';
      const Draw = this.props.drawerStyle === 'menu-drawer' ? 'menu-lost' : 'menu-drawer';
      this.props.onClick(Nav, Draw);
    }
    render(){
    return (
      <div className="navigation">
        <div className='corner' >Refactory</div>
        <div className={this.props.navStyle}>
          <div className="logo">
            <div className="drawer-button">
              <IconButton iconStyle={style.largeIcon} style={style.large} onClick={this.handleChange}>
                <NavigationMenu />
              </IconButton>
            </div>
            <div className="nav-title">Admin Panel</div>
          </div>
          <div className="menu">
             <FlatButton label="Change Password" hoverColor={orange500} style={{height:50, borderRadius:0, color:'#444'}}/>
             <FlatButton label="Logout" hoverColor={orange500} style={{height:50, borderRadius:0, color:'#444'}}/>
          </div>
          <div className="clear"></div>
        </div>
      </div>
    );
  }
}
