import React from "react";
import {orange500, red500, green500} from 'material-ui/styles/colors';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import moment from 'moment';
import {PageTitle} from "./../PageTitle";
import './styles.scss';
import ScreeningsData from '../../../../temp-data/tempScreenings.json'

export class TechScreenings extends React.Component {
  constructor() {
    super()
    this.state = {
      data : ScreeningsData.data
    }
  }
  timeConverter = (secs) => {
    const formatted = moment.utc(secs*1000).format('HH:mm:ss');
    return formatted
  }
    render(){
    return (
      <div>
        {this.state.data.map( (row, index) => (
          <div key={index.toString()}>
            <PageTitle title={row.label} titleStyle={{marginTop:40}} />
            {row.id === 1 &&
              <div key={index.toString()} style={{marginTop:20}}>
                Link : <a href={row.content.link}>{row.content.link}</a>
              <div className="clear"></div>
              <div className="float_left" style={{width:200}}><h3>Score : {row.content.score}</h3></div>
              <div className="float_left" style={{width:200}}><h3>Duration : {this.timeConverter(row.content.duration)}</h3></div>
              <div className="clear"></div>
                <Table selectable={false} >
                  <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                      <TableHeaderColumn style={{color:orange500}}>No</TableHeaderColumn>
                      <TableHeaderColumn style={{color:orange500}}>Answer</TableHeaderColumn>
                      <TableHeaderColumn style={{color:orange500}}>Result</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false}>
                    {row.content.answer.map((row2, index2) =>(
                      <TableRow key={index2.toString()}>
                        <TableRowColumn>{row2.no}</TableRowColumn>
                        <TableRowColumn>{row2.answer}</TableRowColumn>
                        <TableRowColumn style={{color: row2.result === 'Correct' ? green500 : red500}}>{row2.result}</TableRowColumn>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            }
            {row.id != 1 && row.content.map( (row2, index2) => (
                  <div key={index2.toString()}>
                    <h4 className="question" style={{color:orange500}}>{row2.question}</h4>
                    {Array.isArray(row2.answer) ?
                      <ul  className="answer2">
                        {row2.answer.map((row3, index3) => (
                          <li key={index3.toString()}>
                            {row3}
                          </li>
                        ))}
                      </ul>
                      : <p className="answer">{row2.answer}</p>}

                  </div>
                ))
            }
          </div>
        ))}
      </div>
    );
  }
}
