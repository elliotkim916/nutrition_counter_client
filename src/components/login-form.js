import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import {Link} from 'react-router-dom';
import {required, nonEmpty} from '../validators';
import Input from './input';
import {login} from '../actions/auth';
import '../stylesheets/components/_login-page.scss';

export class LoginForm extends React.Component {
  onSubmit(values) {
    const {username, password} = values;
    return this.props.dispatch(login(username, password));
  }

  render() {
    return (
      <div className="login-form">
        <h3 className="login-descriptor">Log in</h3>
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
        <span>Don't have an account? <Link to="/registration-page" className="link-text">Click here</Link></span>
      </div>
    ); 
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);