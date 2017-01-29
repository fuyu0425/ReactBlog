import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
const renderField = ({ input, label, type, textarea, meta: { touched, error } }) => (
  <FormGroup>
    <ControlLabel>{label}</ControlLabel>
    {
      textarea ?
        (
          <FormControl {...input} componentClass="textarea" type={type}
                       placeholder={label}/>
        ) :
        (
          <FormControl {...input} type={type} placeholder={label}/>
        )
    }

    {touched && ((error && <span>{error}</span>))}
  </FormGroup>
);

class CommentForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="author"
            component={renderField}
            type="text"
            label="Author"
          />
        </div>
        <div>
          <Field
            name="content"
            component={renderField}
            type="text"
            textarea
            label="Content"
          />
        </div>
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    );
  }
}
const validate = (values) => {
  const errors = {};
  if (!values.author) errors.author = 'Required';
  if (!values.content) errors.content = 'Required';
  return errors;
};


export default reduxForm({
  form: 'Comment',
  validate,
})(CommentForm);
