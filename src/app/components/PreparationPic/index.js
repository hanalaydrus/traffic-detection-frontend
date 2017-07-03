import React, { Component } from 'react';
import { GridList } from 'material-ui/GridList';
import Preparation from '../../../../temp-data/preparationPic.json';
import './styles.scss';

// import dependency component
import { ListReview } from '../ListReview';

const prepData = Preparation.data;

export class PreparationPic extends Component {

  render() {
    return (
      <div className="prepContainer">
        <div className="gridContainer">
          <GridList
            cellHeight={400}
            className="gridList"
          >
          {
            prepData && prepData.map( (prep, index) =>
              (<ListReview
                key={index}
                prep={prep}
                images={prep.images}
              />)
            )
          }
          </GridList>
        </div>
      </div>
    );
  }
}
