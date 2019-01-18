import React from 'react';
import RegistrationForm from './registration-form';

export function RegistrationPage(props) {
  if (props.loggedIn) {
    return;
  }

  if (props.loading) {
    return;
  }

  return (
    <div>
      <h3>Begin tracking your workout and meals today!</h3>
      <RegistrationForm/>
    </div>
  );
}
