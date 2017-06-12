import React from "react";
import './styles.scss';

export class PageTitle extends React.Component {
    render(){
    return (
      <h2 className="page_title">{this.props.title}</h2>
    );
  }
}
