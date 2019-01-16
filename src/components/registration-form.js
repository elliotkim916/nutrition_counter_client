import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {required, nonEmpty, isTrimmed, length, matches} from '../validators.js';

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    console.log(values);
  }

  render() {
    const passwordLength = length({min: 10, max: 72});
    const matchesPassword = matches('password');

    return (
      <form 
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        <Field
          component={} 
          name="username"
          type="text"
          label="Enter username"
          validate={[required, nonEmpty, isTrimmed]}
        />
        <Field
          component={}
          name="password"
          type="password"
          label="Enter password"
          validate={[required, nonEmpty, isTrimmed]}
        />
        <Field
          component={}
          name="passwordConfirm"
          type="password"
          label="Confirm password"
          validate={[required, nonEmpty, isTrimmed, matchesPassword]}
        />
        <button 
          type="submit"
          disabled={
            this.props.pristine ||
            this.props.submitting
          }
        >
        REGISTER
        </button>
      </form>
    );
  }
}

// To connect the component to the store, you use the reduxForm function.
export default reduxForm({
  form: 'registration'
})(RegistrationForm);
// controls where info about the form will be stored in the state
// in this case, would be state.form.registration