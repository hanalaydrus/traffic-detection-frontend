import React from "react";
import DatePicker from 'material-ui/DatePicker';
import './styles.scss';
import moment from 'moment';
export class RangeDate extends React.Component {
  changeMinDate = (event, date) => {
    const resultMinDate = moment(date).format("YYYY-MM-DD")
    this.props.onChange("minDate", resultMinDate)
  }
  changeMaxDate = (event, date) => {
    const resultMaxDate = moment(date).format("YYYY-MM-DD")
    this.props.onChange("maxDate", resultMaxDate)
  }
    render(){
    return (
      <div className="float_right">
        <div className="float_left"><DatePicker container="inline" floatingLabelText="Min Date" className="inputStyle" onChange={this.changeMinDate} /></div>
        <div className="float_left" style={{marginLeft:20, marginRight:20, lineHeight:6}}> - </div>
        <div className="float_left"><DatePicker container="inline" floatingLabelText="Max Date" className="inputStyle" onChange={this.changeMaxDate}/></div>
      </div>
    );
  }
}
