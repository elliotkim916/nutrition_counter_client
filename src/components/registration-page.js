import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import RegistrationForm from './registration-form';

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
    <div>
      <h3>Begin tracking your workout and meals today!</h3>
      <RegistrationForm/>
      <span>Already have an account?  <Link to="">Click Here!</Link></span>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  loading: state.auth.loading
});

export default connect(mapStateToProps)(RegistrationPage);