import React from 'react';
import LoginForm from './login-form';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';

export class LoginPage extends React.Component {
  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />;
    }

    if (this.props.loading) {
      return (
        <div className="loader">
          <h3>Logging in . . .</h3>
        </div>
      );
    }

    return (
      <div className="login-page">
        <Link to="/" className="nutrition-counter-header">
          <h1>Nutrition Counter</h1>
        </Link>
        <LoginForm />
        <span>Don't have an account? <Link to="/registration-page">Click here</Link></span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  loading: state.auth.loading
});

export default connect(mapStateToProps)(LoginPage);