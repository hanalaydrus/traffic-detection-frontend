import React from 'react';
import { GridTile } from 'material-ui/GridList';
import { RaisedButton } from 'material-ui';

// import dependency components

export class ListReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClick: false,
      label: this.props.prep.label,
      id: this.props.prep.id,
      image: this.props.images,
      status: this.props.prep.status
    };
  }

  onChangeStatus(value) {
    this.setState({
      status: value,
      isClick: true
    });
  }

  render() {
    return (
      <div className="gridTile">
        <GridTile
          className="review"
        >
          <label>{this.state.status}</label>
        </GridTile>
        <GridTile
          titleStyle={{ marginTop: 8 }}
          titleBackground="#303030"
          key={this.state.id}
          title={this.state.label}
          className="boxImage"
        >
          {
            this.state.image.map((file, index) => (
              <div
                className="imgStyle"
                key={index}
              >
                <img
                  src={file}
                  style={{ height: 270 }} />
              </div>
              ))
          }
        </GridTile>
        <div className="buttonStyle">
          <RaisedButton
            backgroundColor="#FF9800"
            className="buttonStyleLeft"
            label="Verify"
            disabled={this.state.isClick}
            onClick={() => this.onChangeStatus('Verified')} />
          <RaisedButton
            className="buttonStyle"
            backgroundColor="#FF9800"
            label="Reject"
            disabled={this.state.isClick}
            onClick={() => this.onChangeStatus('Rejected')} />
        </div>
      </div>
    );
  }
}
