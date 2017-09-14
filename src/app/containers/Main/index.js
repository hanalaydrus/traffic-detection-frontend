import React from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
// import { API_BASE_URL, PUSHER_KEY } from '../../../constants'

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

export default class Main extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      car: '0'
    }
  }
  connectToPusher = () => {
    Pusher.logToConsole = true;

    var pusher = new Pusher('0a6557ec824a2adba923', {
      cluster: 'ap1',
      encrypted: true
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', (data) => {
      console.log('this is the data',data.message);
      this.setState({car: data.message})
    });
  }

  componentWillMount() {
    // this.connectToPusher()
    var params = new URLSearchParams();
    params.append('panel_type', 'info');
    params.append('exp_name', 'jne');
    params.append('exp_title', 'JNE');
    params.append('kotaAsaljne', 'JAKARTA');
    params.append('kotaAsaljne_val', 'Q0dLMTAwMDBK');
    params.append('kotaTujuanjne', 'JAKARTA');
    params.append('kotaTujuanjne_val', 'Q0dLMTAwMDBK');
    params.append('beratKgjne', '1');
    params.append('captchajne', '442');

    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.post('http://www.cektarif.com/exp/jne/jne.tarif.php', params)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        {/* <AppBar position="static" color="default">
          <Toolbar>
            <Typography type="title" color="inherit">
              CCTV Semantic System
            </Typography>
          </Toolbar>
        </AppBar> */}
        <div style={{fontWeight:'bold', margin: 30, textAlign:'center'}}>
          {/* Sejumlah {this.state.car} kendaraan memenuhi Jalan Soekarno Hatta dari pagi hingga saat ini. */}
        </div>
      </div>
    );
  }
}
