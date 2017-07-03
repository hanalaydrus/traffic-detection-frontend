import React from 'react';
import { string } from 'prop-types';
import './styles.scss';

export class PageTitle extends React.Component {
  render() {
    const { titleStyle, title } = this.props;
    return (
      <h2 className="page_title" style={titleStyle}>{title}</h2>
    );
  }
}

PageTitle.propTypes = {
  titleStyle: string.isRequired,
  title: string.isRequired
};
