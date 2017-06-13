import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {PageTitle} from '../PageTitle'
import Preparation from '../../../../temp-data/preparationPic.json'
import {RaisedButton, TextField, Checkbox} from 'material-ui';
import {orange600, orange500} from 'material-ui/styles/colors';
import './styles.scss'

import ListReview from '../ListReview'
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor:'#33353F',
    marginTop: 30,
    paddingLeft: 100,
    paddingTop: 30,
    paddingBottom: 20
  },
  gridList: {
    width: 800,
    overflowY: 'visible',
    backgroundColor:'#33353F',
  },
  review: {
    marginBottom: 10,
    marginRight: 10,
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    height:30,
    borderWidth: 3,
    borderBottom: '#ff9800',
    borderBottomStyle: 'inset',
    backgroundColor:'#303030',
    padding: '4px 0px 0px 8px',
  },
  box: {
    marginRight: 10,
    backgroundColor:'#33353F',
    marginBottom: 10,
  },
};

const prepData = Preparation.data

export class PreparationPic extends React.Component {

  render() {
   return (
     <div className="prep_container" style={{float:this.props.float}}>
      <div style={styles.root}>
        <GridList
          cellHeight={400}
          style={styles.gridList}
        >
        {prepData.map( (prep, index) => <ListReview prep={prep} />)}
        </GridList>
      </div>
    </div>
   );
  }
}
