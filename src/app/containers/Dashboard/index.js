import React from 'react';

// import { API_BASE_URL, PUSHER_KEY } from '../../../constants'
import CardComponent from '../CardComponent';

import { helloGRPC } from '../../../service/greeter_client.ts';

export default class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      car: '0',
      start: true
    }
  }

  componentWillMount() {
    // helloGRPC()
  }

  render() {
    return (
      <div>
        {/* <img src='http://127.0.0.1:5000/video_feed' height="100"/> */}
        <div style={{fontWeight:'bold', margin: 30, textAlign:'center'}}>
          Sejumlah {this.state.car} kendaraan memenuhi Jalan Soekarno Hatta dari pagi hingga saat ini.
        </div>
      </div>
    );
  }
}
