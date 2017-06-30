// @ flow
import React, { Component } from 'react';
import { orange600 } from 'material-ui/styles/colors';
import { Header } from './../../components/Header';
import { Drawer } from './../../components/Drawer';
import StudentListPage from './../../components/StudentListPage';
/**
 * imported others Library
 */
import { Enhance } from '../../HOC/fetchingData';
import * as constants from './constants';

const style = {
  orange: {
    borderColor: orange600
  },
  content_full: {
    marginLeft: 0,
    transition: '1s all ease'
  },
  content_less: {
    marginLeft: 250,
    transition: '1s all ease'
  }
};

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navStyle: 'nav',
      drawerStyle: 'menu-drawer',
      contentStyle: style.content_less,
      value: 1,
      campus: [],
      status: [ 'Pending', 'Siap Interview', 'Preparation', 'Gagal', 'Menunggu Dokumen', 'lulus', 'all' ],
      data: [],
      dataTable: [],
      statsSelect: 'all',
      campusSelect: 'all',
      batchSelect: 'all'
    };
  }

  componentWillMount() {
    this.setState({
      data: getStudent(constants.data),
      dataTable: getStudent(constants.data),
      campus: getCampus(constants.data)
    });
  }

  dataStatus = (value) => {
    this.setState({
      statsSelect: value,
      dataTable: this.getDataBystatus(value)
    });
  }

  dataBatch = (value) => {
    this.setState({
      batchSelect: value,
      dataTable: this.getDataByBatch(value)
    });
  }

  dataCampus = (value) => {
    this.setState({
      campusSelect: value,
      dataTable: this.getDataByCampus(value)
    });
  }

  getDataBystatus = (value) => {
    if (value === 'all' && this.state.campusSelect === 'all') {
      return this.state.data;
    } else if (value === 'all' && this.state.campusSelect !== 'all') {
      return this.state.data.filter(prop => prop.campuses === this.state.campusSelect);
    } else if (this.state.campusSelect !== 'all') {
      return this.state.data.filter(prop => (prop.status === value && prop.campuses === this.state.campusSelect));
    }
    return this.state.data.filter(prop => prop.status === value);
  }

  getDataByBatch = (value) => {
    if (value === 'all' && this.state.statsSelect === 'all') {
      return this.state.data.filter(prop => prop.campuses === this.state.campusSelect);
    } else if (value === 'all' && this.state.statsSelect !== 'all') {
      return this.state.data.filter(prop => (prop.status === this.state.statsSelect && prop.campuses === this.state.campusSelect));
    }
    return this.state.data.filter(prop => prop.batch === value);
  }

  getDataByCampus = (value) => {
    if (value === 'all' && (this.state.statsSelect === 'all')) {
      return this.state.data;
    } else if (value === 'all' && this.state.statsSelect) {
      return this.state.data.filter(prop => prop.status === this.state.statsSelect);
    } else if (this.state.statsSelect !== 'all') {
      return this.state.data.filter(prop => (prop.campuses === value && prop.status === this.state.statsSelect));
    }
    return this.state.data.filter(prop => prop.campuses === value);
  }

  handleChange = (Nav, Draw) => {
    this.setState({ navStyle: Nav });
    this.setState({ drawerStyle: Draw });
    const Const = this.state.contentStyle === style.content_less ? style.content_full : style.content_less;
    this.setState({ contentStyle: Const });
  }

  render() {
    return (
      <div style={{ margin: 0 }}>
        <Header onClick={this.handleChange} navStyle={this.state.navStyle} drawerStyle={this.state.drawerStyle} content={this.state.content}/>
        <Drawer
          drawerStyle={this.state.drawerStyle}
          campus={this.state.campus}
          onEnterBatch={this.dataBatch.bind(this)}
          onEnterCampus={this.dataCampus.bind(this)}
        />
        <div style={this.state.contentStyle}>
          <StudentListPage
            onEnterStatus={this.dataStatus}
            status={this.state.statsSelect}
            dataTable={this.state.dataTable}
          />
        </div>
      </div>
    );
  }
}

function getStudent(data) {
  return data.reduce((acc, curr) => acc.concat(curr.student), []);
}

function getCampus(data) {
  return data.reduce((acc, curr) => {
    delete curr.student;
    return acc.concat(Object.assign({}, curr));
  }, []);
}

/**
 * insert with api we use for the data and replace constants with data
 */
export default Enhance('https://jsonplaceholder.typicode.com/posts')(Dashboard);
