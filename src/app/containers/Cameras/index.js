import React from 'react';
import CardComponent from '../CardComponent';

import { helloGRPC } from '../../../service/greeter_client.ts';

export default class Cameras extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      start: true,
      volume: '-',
      density: '-',
      semantic: '-'
    }
  }

  setVolume = (value) => {
    this.setState({volume: value})
  }

  setDensity = (value) => {
    this.setState({density: value})
  }

  setSemantic = (value) => {
    this.setState({semantic: value})
  }

  componentWillMount() {
    helloGRPC("volume", 1, this.setVolume)
    helloGRPC("density", 1, this.setDensity)
    helloGRPC("semantic", 1, this.setSemantic)
  }

  render() {
    return (
      <div>
        <table style={{width:'100%'}}>
          <tr>
            <td>
            <CardComponent
              image={this.state.start ? "http://127.0.0.1:5000/video_feed" : ""}
              title={this.state.semantic}
              kepadatan={this.state.density}
              volume={this.state.volume + " Kendaraan"}
            />
            </td>
            <td>
              <CardComponent
                image=" "
                title=" "
                kepadatan=" "
                volume=" "
              />
            </td>
            <td>
              <CardComponent
                image=" "
                title=" "
                kepadatan=" "
                volume=" "
              />
            </td>
          </tr>
          <br />
          <tr>
          <td>
            <CardComponent
              image=" "
              title=" "
              kepadatan=" "
              volume=" "
            />
            </td>
            <td>
              <CardComponent
                image=" "
                title=" "
                kepadatan=" "
                volume=" "
              />
            </td>
            <td>
              <CardComponent
                image=" "
                title=" "
                kepadatan=" "
                volume=" "
              />
            </td>
          </tr>
        </table>
      </div>
    );
  }
}
