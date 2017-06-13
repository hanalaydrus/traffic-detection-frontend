import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {RaisedButton, TextField, Checkbox} from 'material-ui';
import {orange600, orange500} from 'material-ui/styles/colors';

//import another component
import {PageTitle} from '../PageTitle'
import Preparation from '../../../../temp-data/preparationPic.json'
/**
* styles move after this fuck you
**/
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
export default class ListReview extends  React.Component {
  constructor(props){
    super(props);
    this.state = {
      isClick:false,
      label:this.props.prep.label,
      id:this.props.prep.id,
      img:this.props.prep.img,
      status:this.props.prep.status
    }
  }

  onChangeStatus(value){
    this.setState({
      status:value,
      isClick:true
    })
  }
  render () {
    return (
      <div>
        <GridTile
          style={styles.review}>
          <label>{this.state.status}</label>
        </GridTile>
        <GridTile
          key={this.state.id}
          title={this.state.label}
          actionIcon={<IconButton></IconButton>}
          style={styles.box}
        >
          <img
            src={this.state.img}
            style={{height: 270}}

          />
        </GridTile>
        <div className="space">
          <RaisedButton label="Verify" style={{marginRight:'10px'}} disabled ={this.state.isClick} onClick ={() => this.onChangeStatus('Verified')}/>
          <RaisedButton label="Reject" disabled={this.state.isClick} onClick ={() => this.onChangeStatus('Rejected')}/>
        </div>
      </div>
    )
  }
}
