import React from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';

// import { API_BASE_URL, PUSHER_KEY } from '../../../constants'
import CardComponent from '../CardComponent';

export default class Videos extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      car: '0',
      start: false
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
      this.setState({car: data.message, start: true})
    });
  }

  componentWillMount() {
    this.connectToPusher()
    axios.post('http://127.0.0.1:8000/vehicle_counting', {
      url : 'http://127.0.0.1:5000/video_feed?type=.mjpg'
    }).then(function (response) {
      console.log('finish send url', response);
    })
  }

  render() {
    return (
      <div>
        <table style={{width:'100%'}}>
          <tr>
            <td>
            <CardComponent
              image={this.state.start ? "http://127.0.0.1:5000/video_feed" : ""}
              title="Jalan Dago"
              kepadatan="Lancar"
              volume={this.state.car + " Kendaraan"}
              hujan="Tidak Hujan"
              banjir="Tidak Banjir"
            />
            </td>
            <td>
              <CardComponent
                image=" "
                title="Jalan Dago"
                kepadatan="Lancar"
                volume="10 Kendaraan"
                hujan="Tidak Hujan"
                banjir="Tidak Banjir"
              />
            </td>
            <td>
              <CardComponent
                image=" "
                title="Jalan Dago"
                kepadatan="Lancar"
                volume="10 Kendaraan"
                hujan="Tidak Hujan"
                banjir="Tidak Banjir"
              />
            </td>
          </tr>
          <br />
          <tr>
          <td>
            <CardComponent
              image=" "
              title="Jalan Dago"
              kepadatan="Lancar"
              volume="10 Kendaraan"
              hujan="Tidak Hujan"
              banjir="Tidak Banjir"
            />
            </td>
            <td>
              <CardComponent
                image=" "
                title="Jalan Dago"
                kepadatan="Lancar"
                volume="10 Kendaraan"
                hujan="Tidak Hujan"
                banjir="Tidak Banjir"
              />
            </td>
            <td>
              <CardComponent
                image=" "
                title="Jalan Dago"
                kepadatan="Lancar"
                volume="10 Kendaraan"
                hujan="Tidak Hujan"
                banjir="Tidak Banjir"
              />
            </td>
          </tr>
        </table>


        {/* <img src='http://127.0.0.1:5000/video_feed' height="100"/> */}
        {/* <div style={{fontWeight:'bold', margin: 30, textAlign:'center'}}>
          Sejumlah {this.state.car} kendaraan memenuhi Jalan Soekarno Hatta dari pagi hingga saat ini.
        </div> */}
      </div>
    );
  }
}
