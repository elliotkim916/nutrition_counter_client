import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import RegistrationForm from './registration-form';
import '../stylesheets/components/_login-page.scss';

export function RegistrationPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  if (props.loading) {
    return (
      <div className="loader">
        <h3>Creating Account . . . </h3>
      </div>
    );
  }

  return (
    <div className="registration-page">
      <Link to="/" className="nutrition-counter-header">Nutrition Counter</Link>
      <RegistrationForm/>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.authReducer.currentUser !== null,
  loading: state.authReducer.loading
});

export default connect(mapStateToProps)(RegistrationPage);          