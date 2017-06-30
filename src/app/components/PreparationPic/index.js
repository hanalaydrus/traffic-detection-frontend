import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { PageTitle } from '../PageTitle';
import Preparation from '../../../../temp-data/preparationPic.json';
import { RaisedButton, TextField, Checkbox } from 'material-ui';
import { orange600, orange500 } from 'material-ui/styles/colors';
import './styles.scss';

// import dependency component
import { ListReview } from '../ListReview';

const prepData = Preparation.data;

export class PreparationPic extends React.Component {

  render() {
    return (
      <div className="prepContainer">
        <div className="gridContainer">
          <GridList
            cellHeight={400}
            className="gridList"
          >
            {prepData.map((prep, index) =>
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
