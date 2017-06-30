import React, { Component } from 'react';
import { Checkbox } from 'material-ui';
import { orange600 } from 'material-ui/styles/colors';
import { Header } from './../../components/Header';
import { Drawer } from './../../components/DrawerBase';
import { ChartTrackers } from './../../components/ChartTrackers';
import { PageTitle } from './../../components/PageTitle';
import { RangeDate } from './../../components/RangeDate';
import { TrackerPic } from './../../components/TrackerPic';
import { ScoreCard } from './../../components/ScoreCard';

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

class Curriculum extends Component {
  constructor() {
    super();
    this.state = {
      navStyle: 'nav',
      drawerStyle: 'menu-drawer',
      contentStyle: style.content_less,
      wpm_check: true,
      duolingo_check: true,
      minDate: '0001-01-01',
      maxDate: '9999-12-31'
    };
  }

  handleChange = (Nav, Draw) => {
    this.setState({ navStyle: Nav });
    this.setState({ drawerStyle: Draw });
    const Const = this.state.contentStyle === style.content_less ? style.content_full : style.content_less;
    this.setState({ contentStyle: Const });
  }
  changeDate = (type, date) => {
    if (type === 'minDate') {
      this.setState({ minDate: date });
    }
    if (type === 'maxDate') {
      this.setState({ maxDate: date });
    }
  }


  wpm_isChecked = () => {
    this.setState({ wpm_check: !this.state.wpm_check });
  }

  duolingo_isChecked = () => {
    this.setState({ duolingo_check: !this.state.duolingo_check });
  }

  render() {
    return (
      <div style={{ margin: 0 }}>
        <Header onClick={this.handleChange} navStyle={this.state.navStyle} drawerStyle={this.state.drawerStyle} content={this.state.content} />
        <Drawer drawerStyle={this.state.drawerStyle} />
        <div style={this.state.contentStyle}>
          <PageTitle title="Summary" />
          <ChartTrackers />
          <div className="clear" />
          <PageTitle title="Learning Tracker" />
          <RangeDate minDate={this.state.minDate} maxDate={this.state.maxDate} onChange={this.changeDate} />
          <div className="clear" />
          <div className="float_right">
            <Checkbox label="WPM" iconStyle={{ marginRight: 4 }} checked={this.state.wpm_check} onClick={this.wpm_isChecked} />
          </div>
          <div className="float_right" style={{ marginRight: 30 }}>
            <Checkbox label="Duolingo" iconStyle={{ marginRight: 4 }} checked={this.state.duolingo_check} onClick={this.duolingo_isChecked} />
          </div>
          <div className="clear" />
          <TrackerPic float="left" title="Duolingo" check={this.state.duolingo_check} minDate={this.state.minDate} maxDate={this.state.maxDate} />
          <TrackerPic float="right" title="WPM" check={this.state.wpm_check} minDate={this.state.minDate} maxDate={this.state.maxDate} />
          <div className="clear" />
          <PageTitle title="Score Card" />
          <ScoreCard />
        </div>
      </div>
    );
  }
}

export default Curriculum;
