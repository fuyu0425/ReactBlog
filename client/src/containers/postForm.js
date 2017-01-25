import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

const renderField = ({ input, label, type, textarea, meta: { touched, error } }) => {
  console.log(input);
  console.log(textarea);
  return (
    <div>
      <label>{label}</label>
      <div>
        {
          textarea ? (
              <textarea {...input} placeholder={label} type={type}/>
            ) : (
              <input {...input} placeholder={label} type={type}/>
            )
        }
        {touched && ((error && <span>{error}</span>) )}
      </div>
    </div>
  )
};
class PostForm extends Component {
  render() {
    const { handleSubmit }=this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="title" component={renderField} type="text"
                 label="Title"/>
        </div>
        <div>
          <Field name="content" component={renderField} type="text" textarea
                 label="Content"/>
        </div>
        <div>
          <Field name="summary" component={renderField} type="text"
                 label="Summary"/>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}
const validate = (values) => {
  let errors = {};
  if (!values.title) errors.title = 'Required';
  if (!values.content) errors.content = 'Required';
  return errors;
};
PostForm = reduxForm({
  form : 'Post',
  validate
})(PostForm);

export default PostForm;
