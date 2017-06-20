//import library
import React from 'react'
import AceEditor from 'react-ace' //Editor
import brace from 'brace' //Editor plugin
import moment from 'moment' //Date Time Format
import 'brace/mode/javascript' //import language editor
import 'brace/theme/monokai' //import theme editor

//import component material-ui
import {RaisedButton} from 'material-ui';
import {orange500} from 'material-ui/styles/colors';

//import style scss
import './styles.scss';

//handle for error
window.onerror = (msg, url, linenumber) => {
  console.log('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);

  return true;
}


export class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code: props.data.code, //code  online test in editor
      duration: props.data.duration, //duration online test
      result: '' //result of code if we click RUN button
    }
  }
  //function for convert time (from second to time)
  timeConverter = (secs) => {
    const formatted = moment.utc(secs*1000).format('HH:mm:ss');
    return formatted
  }
  //this function for handle if we click RUN button
  onClick = () => {
      this.setState({result:''})
      const editor = this.ace.editor; //getValue code in editor
      const newCode = editor.getValue() //getValue code in editor
      this.setState({code:newCode})
      const klass = this;
      //Override method for console.log
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
    render(){
    return (
      <div >
        <h4 className={ "orange" }>{this.props.title}</h4> {/*Script 1 or Script 2*/}
        <div className={ "editor_container" }>
          {/*AceEditor*/}
          <AceEditor
              mode="javascript"
              theme="monokai"
              name="Online_Test"
              editorProps={{$blockScrolling: true}}
              width = '100%'
              height = '250px'
              fontSize = {14}
              value = {this.state.code}
              ref={instance => { this.ace = instance; }}
          />
        </div>
        <div className={ "run_container" }>
          {/*RUN button*/}
          <RaisedButton label="Run" primary={true} onClick={this.onClick} style={{float:'left'}}/>
          <div style={{float:'right', paddingTop:10}}>
          Duration : {this.timeConverter(this.state.duration)/* Show duration*/}
          </div>
          <div className={ "clear" }></div>
          <div className={ "result" }>
            {this.state.result.match(/#ff%&/gi) ? this.state.result.split('#ff%&').map( (item, idx) => {
              return ( <div key={idx}>{item}</div> )
            }) : null }
          </div>
        </div>
        <div className={ "clear" } ></div>
          <div ref={(el) => (this.instance = el)} />
    </div>
    );
  }
}
