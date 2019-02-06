import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import {required, nonEmpty} from '../validators';
import Input from './input';
import {login} from '../actions/auth';

export class LoginForm extends React.Component {
  onSubmit(values) {
    const {username, password} = values;
    return this.props.dispatch(login(username, password));
  }

  render() {
    return (
      <div className="login-form">
        <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
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
            disabled={this.props.pristine || this.props.submitting}  
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