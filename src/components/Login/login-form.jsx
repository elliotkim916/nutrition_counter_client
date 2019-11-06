import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import {Link} from 'react-router-dom';
import {required, nonEmpty} from '../../validators';
import Input from '../Input/input';
import {login} from '../../actions/auth';
import '../../index.scss';

export class LoginForm extends React.Component {
  onSubmit(values) {
    const {username, password} = values;
    return this.props.dispatch(login(username, password));
  }

  render() {
    return (
      <div className="login-form fadeIn">
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
        
        <div className="demo-container">
          <span className="demo-title">Demo Account</span><br/>
          <span>username: testone</span><br/>
          <span>password: testonepassword</span>
			  </div>
      </div>
    ); 
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);