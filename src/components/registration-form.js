import React from 'react';
import {reduxForm, Field, focus, SubmissionError} from 'redux-form';
import {Link} from 'react-router-dom';
import {required, nonEmpty, isTrimmed, length, matches} from '../validators.js';
import Input from './input';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';

// why does this cause errors if these variables are within the render function?
const passwordLength = length({min: 8, max: 72});
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    console.log(values);
    const {username, password} = values;
    const user = {username, password}; 
    return this.props.dispatch(registerUser(user))
    .then(() => {
      return this.props.dispatch(login(username, password));
    })
    .catch(err => {
      if (err.name === 'SubmissionError') {
        throw new SubmissionError({username: 'Username already exists'});
      }
    });
  }

  render() {
    return (
      <div className="login-form">
        <h3 className="login-descriptor">Sign up</h3>
        <form 
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        >
          <Field
            component={Input} 
            name="username"
            type="text"
            label="Enter username"
            validate={[required, nonEmpty, isTrimmed]}
          />
          <Field
            component={Input}
            name="password"
            type="password"
            label="Enter password"
            validate={[required, isTrimmed, passwordLength]}
          />
          <Field
            component={Input}
            name="passwordConfirm"
            type="password"
            label="Confirm password"
            validate={[required, nonEmpty, matchesPassword]}
          />
          <button 
            type="submit"
            disabled={this.props.pristine || this.props.submitting}
            className="registration-btn"
          >
          REGISTER
          </button>
        </form>
        <span>Have an account?  <Link to="/login-page" className="link-text">Click Here!</Link></span>
      </div>
    );
  }
}

// To connect the component to the store, you use the reduxForm function.
export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) => 
    dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
// controls where info about the form will be stored in the state
// in this case, would be state.form.registration