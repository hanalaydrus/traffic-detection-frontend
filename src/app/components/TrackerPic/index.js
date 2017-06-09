import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {PageTitle} from '../PageTitle'
import TrackingData from '../../../../temp-data/tempTrackImage'
import './styles.scss'
import moment from 'moment'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor:'#33353F',
    marginTop: 20
  },
  gridList: {
    height: 450,
    overflowY: 'auto',
    backgroundColor:'#33353F',
  },
};

/**
 * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
 */
 const tableData = TrackingData.data


 export class TrackerPic extends React.Component {
   showData = (data) => {
     const type_data = this.props.title
     const check = this.props.check
     const minDate = this.props.minDate
     const maxDate = this.props.maxDate
     console.log(this.props);
     return data.filter(function (el) {
       if(check === true){
         return (el.type === type_data && moment(el.date).isSameOrAfter(minDate) && moment(el.date).isSameOrBefore(maxDate));
       }
     });
   }
     render(){
     return (
       <div className="track_container" style={{float:this.props.float}}>
          <PageTitle title={this.props.title} />
         <div style={styles.root}>
           <GridList
             cellHeight={180}
             style={styles.gridList}
           >
             {this.showData(tableData).map( (row, index) => (
               <GridTile
                 key={row.img}
                 title={row.date}
                 actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                 style={{backgroundColor:'#33353F'}}
                 className="img_style"
               >
                 <img src={row.img} />
               </GridTile>
             ))}
           </GridList>
         </div>
        </div>
     );
   }
 }
