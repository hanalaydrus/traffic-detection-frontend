import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import {RaisedButton} from 'material-ui';
import {orange500} from 'material-ui/styles/colors';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import moment from 'moment';


import './styles.scss';
window.onerror = (msg, url, linenumber) => {
  console.log('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);

  return true;
}


export class Editor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      code: props.data.code,
      duration: props.data.duration,
      result: ''
    }
  }
  timeConverter = (secs) => {
    const formatted = moment.utc(secs*1000).format('HH:mm:ss');
    return formatted
  }

  onClick = () => {
    try{
      this.setState({result:''})
      const editor = this.ace.editor;
      const newCode = editor.getValue()
      this.setState({code:newCode})
      const klass = this;
      console.log = (newCode) => {
        this.setState((prevState) => {
          return { result: prevState.result + '#ff%&' + newCode }
        })
      };
      let s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.innerHTML = newCode;
      this.instance.appendChild(s);
    }
    catch (e) {
      console.log("hai");
    }

  }

    render(){
    return (
      <div >
        <h4 style={{color:orange500}}>{this.props.title}</h4>
        <div className="editor_container">
          <AceEditor
              mode="javascript"
              theme="monokai"
              onChange={this.onChange}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{$blockScrolling: true}}
              width = '100%'
              height = '250px'
              fontSize = {14}
              value = {this.state.code}
              ref={instance => { this.ace = instance; }}
          />
        </div>
        <div className="run_container">
          <RaisedButton label="Run" primary={true} onClick={this.onClick} style={{float:'left'}}/>
          <div style={{float:'right', paddingTop:10}}>
          Duration : {this.timeConverter(this.state.duration)}
          </div>
          <div className="clear"></div>
          <div className="result">
            {this.state.result.match(/#ff%&/gi) ? this.state.result.split('#ff%&').map( (item, idx) => {
              return ( <div key={idx}>{item}</div> )
            }) : null }
          </div>
        </div>
        <div className="clear" ></div>
          <div ref={(el) => (this.instance = el)} />
    </div>
    );
  }
}
