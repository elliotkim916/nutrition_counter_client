import React from 'react';
import {reduxForm, Field} from 'redux-form';

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    console.log(values);
  }

  render() {
    return (
      <form 
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        <Field 
          name="username"
          label="Enter username"
        />
        <Field
          name="password"
          label="Enter password"
        />
        <Field
          name="passwordConfirm"
          label="Confirm password"
        />
        <button type="submit">REGISTER</button>
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