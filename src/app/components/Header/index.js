import React from "react";
import './styles.scss';

export class Header extends React.Component {
  render(){
    return (
      <div className="test">
        <h1>{this.props.name}</h1>
      </div>
    );
  }
}
