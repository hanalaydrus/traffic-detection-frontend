import React from 'react';
import CardComponent from '../CardComponent';

import { helloGRPC } from '../../../service/greeter_client.ts';

export default class Cameras extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      start: true,
      volume1: '-',
      density1: '-',
      semantic1: '',
      volume2: '-',
      density2: '-',
      semantic2: '',
      volume3: '-',
      density3: '-',
      semantic3: '',
      volume4: '-',
      density4: '-',
      semantic4: '',
      volume5: '-',
      density5: '-',
      semantic5: '',
      volume6: '-',
      density6: '-',
      semantic6: ''
    }
  }


  setCamera1 = (value) => {
    var response = JSON.parse(value)
    this.setState({volume1: response.volume})
    this.setState({density1: response.density})
    this.setState({semantic1: response.semantic})
  }
  setCamera2 = (value) => {
    var response = JSON.parse(value)
    this.setState({volume2: response.volume})
    this.setState({density2: response.density})
    this.setState({semantic2: response.semantic})
  }
  setCamera3 = (value) => {
    var response = JSON.parse(value)
    this.setState({volume3: response.volume})
    this.setState({density3: response.density})
    this.setState({semantic3: response.semantic})
  }
  setCamera4 = (value) => {
    var response = JSON.parse(value)
    this.setState({volume4: response.volume})
    this.setState({density4: response.density})
    this.setState({semantic4: response.semantic})
  }
  setCamera5 = (value) => {
    var response = JSON.parse(value)
    this.setState({volume5: response.volume})
    this.setState({density5: response.density})
    this.setState({semantic5: response.semantic})
  }
  setCamera6 = (value) => {
    var response = JSON.parse(value)
    this.setState({volume6: response.volume})
    this.setState({density6: response.density})
    this.setState({semantic6: response.semantic})
  }

  componentWillMount() {
    // camera_1
    helloGRPC("all", 1, this.setCamera1)
    // camera_2
    helloGRPC("all", 2, this.setCamera2)
    // // camera_3
    helloGRPC("all", 3, this.setCamera3)
    // // camera_4
    helloGRPC("all", 4, this.setCamera4)
    // // camera_5
    helloGRPC("all", 5, this.setCamera5)
    // // camera_6
    helloGRPC("all", 6, this.setCamera6)
  }

  render() {
    return (
      <div>
        <table style={{width:'100%'}}>
          <tr>
            <td>
            <CardComponent
              image={this.state.start ? "http://localhost:5000/camera_1" : ""}
              title={this.state.semantic1}
              kepadatan={this.state.density1}
              volume={this.state.volume1 + " Kendaraan"}
            />
            </td>
            <td>
              <CardComponent
                image={this.state.start ? "http://localhost:5000/camera_2" : ""}
                title={this.state.semantic2}
                kepadatan={this.state.density2}
                volume={this.state.volume2 + " Kendaraan"}
              />
            </td>
            <td>
              <CardComponent
                image={this.state.start ? "http://localhost:5000/camera_3" : ""}
                title={this.state.semantic3}
                kepadatan={this.state.density3}
                volume={this.state.volume3 + " Kendaraan"}
              />
            </td>
          </tr>
          <br />
          <tr>
          <td>
            <CardComponent
              image={this.state.start ? "http://localhost:5000/camera_4" : ""}
              title={this.state.semantic4}
              kepadatan={this.state.density4}
              volume={this.state.volume4 + " Kendaraan"}
            />
            </td>
            <td>
              <CardComponent
                image={this.state.start ? "http://localhost:5000/camera_5" : ""}
                title={this.state.semantic5}
                kepadatan={this.state.density5}
                volume={this.state.volume5 + " Kendaraan"}
              />
            </td>
            <td>
              <CardComponent
                image={this.state.start ? "http://localhost:5000/camera_6" : ""}
                title={this.state.semantic6}
                kepadatan={this.state.density6}
                volume={this.state.volume6 + " Kendaraan"}
              />
            </td>
          </tr>
        </table>
      </div>
    );
  }
}
