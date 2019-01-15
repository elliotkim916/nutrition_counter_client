import React from 'react';
import {reduxForm, Field} from 'redux-form';

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    console.log(values);
  }

  render() {
    return (
      <form>
        <Field 
          name="username"
        />
        <Field
          name="password"
        />
        <Field
          name="passwordConfirm"
        />
        <button type="submit">REGISTER</button>
      </form>
    );
  }
}

// To connect the component to the store, you use the reduxForm function.
// controls where info about the form will be stored in the state
// in this case, would be state.form.registration
export default reduxForm({
  form: 'registration'
})(RegistrationForm);