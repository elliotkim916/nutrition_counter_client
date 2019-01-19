import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import {required, nonEmpty, isTrimmed, length, matches} from '../validators';
import Input from './input';

export class LoginForm extends React.Component {
  onSubmit(values) {
    console.log(values);
  }

  render() {
    return (
      <div className="login-form">
        <form onSubmit={this.props.handleSubmit(values => onSubmit(values))}>
          <Field
            component={Input}
            type="text"
            name="username"
            label="Enter username"
            validate={[required, nonEmpty]}
          />
          <Field
            component={Input}
            type="password"
            name="password"
            label="Enter password"
            validate={[required, nonEmpty]}
          />
          <button 
            type="submit"
            className="login-btn"  
          >
            LOG IN
          </button>
        </form>
      </div>
    ); 
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);