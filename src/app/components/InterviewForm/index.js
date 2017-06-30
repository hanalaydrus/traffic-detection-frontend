import React from 'react';
import './styles.scss';
import { PageTitle } from './../PageTitle';
import { TextField } from 'material-ui';
import { orange600 } from 'material-ui/styles/colors';

const style = {
  orange: {
    borderColor: orange600
  }
};
export class InterviewForm extends React.Component {
  render() {
    return (
      <div className={`${this.props.float} interview_container`}>
        <PageTitle title={this.props.title} />
        <TextField
          multiLine
          rows={4}
          rowsMax={4}
          fullWidth
          className="text_field_todo_form"
          underlineFocusStyle={style.orange}
          style={{ marginTop: 20 }}
          id={this.props.title}
        />
      </div>
    );
  }
}
