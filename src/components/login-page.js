import React from 'react';
import LoginForm from './login-form';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import '../stylesheets/components/_login-page.scss';

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
          <h2 className="login-header">Nutrition Counter</h2>
        </Link>
        <LoginForm />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.authReducer.currentUser !== null,
  loading: state.authReducer.loading
});

export default connect(mapStateToProps)(LoginPage);