import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import {RaisedButton, TextField, Checkbox} from 'material-ui'
import {orange600, orange500} from 'material-ui/styles/colors'
import styles from "./styles.scss"

//import dependency components

import {PageTitle} from '../PageTitle'
import Preparation from '../../../../temp-data/preparationPic.json'

const Data = Preparation.data


export default class ListReview extends  React.Component {
  constructor(props, i){
    super(props);
    this.state = {
      isClick: false,
      label: this.props.prep.label,
      id: this.props.prep.id,
      images: this.props.images,
      status: this.props.prep.status
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
        <div className="gridTile" style={{height:'auto'}}>
          <GridTile
            className="review" >
            <label>{this.state.status}</label>
          </GridTile>
          <GridTile
            key={this.state.id}
            title={this.state.label}
            actionIcon={<IconButton></IconButton>}
            className="box"
          >
          {
            this.state.images.map( (file) => {
              return (
                <div style={{display: 'block', border: 3}}>
                  <img 
                  src={file}
                  style={{height:270}}/>
                </div>
              )
            })
          }          
          </GridTile>
          <div className="space">
            <RaisedButton label="Verify" style={{marginRight:'10px'}} disabled ={this.state.isClick} onClick ={() => this.onChangeStatus('Verified')}/>
            <RaisedButton label="Reject" disabled={this.state.isClick} onClick ={() => this.onChangeStatus('Rejected')}/>
          </div>
      </div>
    )
  }
}
