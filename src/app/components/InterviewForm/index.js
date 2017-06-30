import React from 'react';
import { string } from 'prop-types';
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
    const { title, float } = this.props;
    return (
      <div className={`${float} interview_container`}>
        <PageTitle title={title} />
        <TextField
          multiLine
          rows={4}
          rowsMax={4}
          fullWidth
          className="text_field_todo_form"
          underlineFocusStyle={style.orange}
          style={{ marginTop: 20 }}
          id={title}
        />
      </div>
    );
  }
}

InterviewForm.propTypes = {
  float: string.isRequired,
  title: string.isRequired
};
