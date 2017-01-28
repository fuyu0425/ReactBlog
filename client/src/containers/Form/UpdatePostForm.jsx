import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { getPostDetail } from '../../actions/action_post';


const renderField = ({ input, label, type, textarea, meta: { touched, error } }) => (
  <div>
    <label htmlFor={label}>{label}</label>
    <div>
      {
        textarea ?
          (
            <textarea {...input} placeholder={label} type={type}/>
          ) :
          (
            <input {...input} placeholder={label} type={type}/>
          )
      }
      {touched && ((error && <span>{error}</span>))}
    </div>
  </div>
);
let id;
class PostForm extends Component {
  componentDidMount() {
    const { postId } = this.props;
    console.log(postId);
    id = postId;
    this.props.getPostDetail(postId);
  }

  componentWillUnmount() {
    id = undefined;
  }

  render() {
    const { postId } = this.props;
    console.log(postId);
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="title"
            component={renderField}
            type="text"
            label="Title"
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
          <Field
            name="summary"
            component={renderField}
            type="text"
            label="Summary"
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}
const validate = (values) => {
  const errors = {};
  if (!values.title) errors.title = 'Required';
  if (!values.content) errors.content = 'Required';
  return errors;
};


function mapStateToProps({ post: { postDetail } }) {
  if (postDetail.id && postDetail.id === id) {
    return { initialValues: postDetail };
  }
  return {};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPostDetail }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'UpdatePost',
  validate,
})(PostForm));
