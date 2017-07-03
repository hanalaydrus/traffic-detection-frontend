import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ScoreCardData from '../../../../temp-data/tempScoreCard.json';
import './styles.scss';

const styles = {
  button: {
    margin: 12
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0
  }
};

const SCData = ScoreCardData.data;

export class ScoreCard extends Component {
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <RaisedButton
          label="Upload Score Card (CSV)"
          labelPosition="before"
          style={styles.button}
          containerElement="label"
          primary
        >
          <input type="file" style={styles.exampleImageInput} />
        </RaisedButton>
        <div className="view_container">
          {
            SCData && SCData.map( (row, index) => (
            <div key={index}>
              <h4>{row.subjects}</h4>
              <ul>
                {
                  row.details.map( (row, index) => (
                  <li key={index}>
                    {row}
                  </li>))
                }
              </ul>
            </div>))
          }
        </div>
      </div>
    );
  }
}
