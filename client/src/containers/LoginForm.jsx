import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type}/>
            {touched && ((error && <span>{error}</span>) )}
        </div>
    </div>
);
class LoginForm extends Component {
    render() {
        const { handleSubmit }=this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <Field name="username" component={renderField} type="text"
                           label="Username"/>
                </div>
                <div>
                    <Field name="password" component={renderField}
                           type="password"
                           label="Password"/>
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
    if (!values.username) errors.username = 'Required';
    if (!values.password) errors.password = 'Required';
    return errors;
};
LoginForm = reduxForm({
    form : 'Login',
    validate
})(LoginForm);

export default LoginForm;
