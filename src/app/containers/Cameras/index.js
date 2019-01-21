import React from 'react';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import CardComponent from '../CardComponent';
import { CSVLink, CSVDownload } from 'react-csv';
import { helloGRPC } from '../../../service/greeter_client.ts';

const styles = {
  card: {
    margin: '0px 50px 10px 12px',
    height: 150
  }
};

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
      semantic6: '',
      semantic_city: ''
    }
  }

  setCamera1 = (value) => {
    var response = JSON.parse(value)
    this.setState({volume1: response.volume})
    this.setState({density1: response.density})
    this.setState({semantic1: response.semantic})

    // if request only volume
    // this.setState({volume1: value})
    // this.setState({density1: value})
    // this.setState({semantic1: value})
  }
  setCamera2 = (value) => {
    var response = JSON.parse(value)
    this.setState({volume2: response.volume})
    this.setState({density2: response.density})
    this.setState({semantic2: response.semantic})

    // if request only one
    // this.setState({volume2: value})
    // this.setState({density2: value})
    // this.setState({semantic2: value})
  }
  setCamera3 = (value) => {
    var response = JSON.parse(value)
    this.setState({volume3: response.volume})
    this.setState({density3: response.density})
    this.setState({semantic3: response.semantic})

    // if request only one
    // this.setState({volume3: value})
    // this.setState({density3: value})
    // this.setState({semantic3: value})

  }
  setCamera4 = (value) => {
    var response = JSON.parse(value)
    this.setState({volume4: response.volume})
    this.setState({density4: response.density})
    this.setState({semantic4: response.semantic})

    // if request only one
    // this.setState({volume4: value})
    // this.setState({density4: value})
    // this.setState({semantic4: value})
  }
  setCamera5 = (value) => {
    var response = JSON.parse(value)
    this.setState({volume5: response.volume})
    this.setState({density5: response.density})
    this.setState({semantic5: response.semantic})

    // if request only one
    // this.setState({volume5: value})
    // this.setState({density5: value})
    // this.setState({semantic5: value})
  }
  setCamera6 = (value) => {
    var response = JSON.parse(value)
    this.setState({volume6: response.volume})
    this.setState({density6: response.density})
    this.setState({semantic6: response.semantic})

    // if request only one
    // this.setState({volume6: value})
    // this.setState({density6: value})
    // this.setState({semantic6: value})
  }

  setSemanticCity = (value) => {
    this.setState({semantic_city: value})
  }

  componentWillMount() {
    // semantic city
    helloGRPC("semantic", 10, this.setSemanticCity)
    // camera_1
    helloGRPC("all", 11, this.setCamera1)
    //camera_2
    helloGRPC("all", 12, this.setCamera2)
    // camera_3
    helloGRPC("all", 13, this.setCamera3)
    // camera_4
    helloGRPC("all", 14, this.setCamera4)
    // camera_5
    helloGRPC("all", 15, this.setCamera5)
    // camera_6
    // helloGRPC("all", 16, this.setCamera6)
  }

  render() {
    return (
      <div>
        <div>
          <Card style={styles.card}>
            <CardContent>
              {this.state.semantic_city === "" ? <div style={{alignItems: 'center'}}><CircularProgress size={20} /> </div>: <Typography type="headline" style={{fontSize: '20px'}}>{ this.state.semantic_city }</Typography>}
            </CardContent>
          </Card>
        </div>
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
          <br/>
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
