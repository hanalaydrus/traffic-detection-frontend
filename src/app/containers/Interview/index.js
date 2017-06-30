import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';
import { green500, blue500, orange600 } from 'material-ui/styles/colors';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import { Header } from './../../components/Header';
import { Drawer } from './../../components/DrawerBase';
import { PageTitle } from './../../components/PageTitle';
import { InterviewForm } from './../../components/InterviewForm';
import { TechScreenings } from './../../components/TechScreenings';
import { Editor } from './../../components/AceEditor';

import './styles.scss';
import tempScreenings from '../../../../temp-data/tempScreenings.json';

const data = tempScreenings.data[3].content.script1;
const data2 = tempScreenings.data[3].content.script2;

const style = {
  orange: {
    borderColor: orange600
  },
  content_full: {
    marginLeft: 0,
    padding: 40,
    paddingTop: 20,
    transition: '1s all ease'
  },
  content_less: {
    marginLeft: 250,
    padding: 40,
    paddingTop: 20,
    transition: '1s all ease'
  }
};

class Interview extends Component {
  constructor() {
    super();
    this.state = {
      navStyle: 'nav',
      drawerStyle: 'menu-drawer',
      contentStyle: style.content_less,
      date: 'Monday, 12 June 2107',
      time: '00:00'
    };
  }

  handleChange = (Nav, Draw) => {
    this.setState({ navStyle: Nav });
    this.setState({ drawerStyle: Draw });
    const Const = this.state.contentStyle === style.content_less ? style.content_full : style.content_less;
    this.setState({ contentStyle: Const });
  }

  render() {
    return (
      <div style={{ margin: 0 }} >
        <Header onClick={this.handleChange} navStyle={this.state.navStyle} drawerStyle={this.state.drawerStyle} content={this.state.content} />
        <Drawer drawerStyle={this.state.drawerStyle} />
        <div style={this.state.contentStyle}>
          <PageTitle title="Interview Time" />
          <div className="date_time float_left" style={{ width: 300 }}>
            {this.state.date} at {this.state.time}
          </div>
          <div className="confirmed float_left">
            <RaisedButton
              label="Confirmed"
              backgroundColor={green500}
              style={{ width: 150 }}
            />
          </div>
          <div className="clear" />
          <div style={{ marginBottom: 30 }}>
            <div className="float_left" style={{ width: 150 }}>
              <DatePicker floatingLabelText="Date" className="inputStyle" />
            </div>
            <div className="float_left" style={{ marginLeft: 20, width: 150 }}>
              <TimePicker format="24hr" floatingLabelText="Time" className="inputTimeStyle" />
            </div>
            <div className="float_left" style={{ marginTop: 28 }}>
              <RaisedButton
                label="Reschedule"
                backgroundColor={blue500}
                style={{ width: 150 }}
              />
            </div>
            <div className="clear" />
          </div>
          <PageTitle title="Interview Result" />
          <div style={{ textAlign: 'right' }}>
            <InterviewForm float="float_left" title="Tech" />
            <InterviewForm float="float_right" title="NonTech" />
            <RaisedButton label="Save" primary className="save_btn" />
            <div className="clear" />
          </div>
          <TechScreenings />
          <Editor title="Script 1" data={data} />
          <Editor title="Script 2" data={data2} />
        </div>
      </div>

    );
  }
}

export default Interview;
