import React from 'react';
import CardComponent from '../CardComponent';

import { helloGRPC } from '../../../service/greeter_client.ts';

export default class Cameras extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      car: '0',
      start: true
    }
  }

  componentWillMount() {
    helloGRPC()
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
