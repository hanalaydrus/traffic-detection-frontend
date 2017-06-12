import React from "react";
import { BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts';
import {blue500, orange500} from 'material-ui/styles/colors';
import './styles.scss'
const tilesData = [
{ date: '2017-06-12', Duolingo: 2, WPM: 60 },
{ date: '2017-06-13', Duolingo: 3, WPM: 56 },
{ date: '2017-06-14', Duolingo: 2, WPM: 62 },
{ date: '2017-06-15', Duolingo: 5, WPM: 63 },
{ date: '2017-06-16', Duolingo: 2, WPM: 60 },
{ date: '2017-06-19', Duolingo: 3, WPM: 56 },
{ date: '2017-06-20', Duolingo: 2, WPM: 62 },
{ date: '2017-06-21', Duolingo: 5, WPM: 63 },


];
export class ChartTrackers extends React.Component {
  state = {
      data: tilesData
  };
    render(){
    return (
      <ResponsiveContainer width={'90%'} height={300} style={{margin:'auto'}}>
        <BarChart data={this.state.data}>
          <XAxis dataKey="date" stroke="#CCC"/>
          <YAxis yAxisId="left" orientation="left" stroke={blue500}/>
          <YAxis yAxisId="right" orientation="right" stroke={orange500}/>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip/>
          <Legend />
          <Bar yAxisId="left" dataKey="Duolingo" fill={blue500} />
          <Bar yAxisId="right" dataKey="WPM" fill={orange500} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
