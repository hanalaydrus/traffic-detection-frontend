/**
 * library imoported
 */
import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export const Enhance = (url) => (WrappedComponent) => class extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            dataFetch:false
        };
    }

  componentDidMount() {
    fetch(url)
        .then(res => res.json())
        .then((response) => {
            this.setState({
            dataFetch:response
        });})
        .catch(e => e);
    }

    render() {
        if(this.state.dataFetch) {
            return <WrappedComponent data = {this.state.dataFetch} {...this.props} />;
        }
        return(
          <div>
              <h1>Loading......................</h1>
              <CircularProgress size={60} thickness={7} />
              <CircularProgress size={80} thickness={5} />
          </div>
        );
    }
  };

