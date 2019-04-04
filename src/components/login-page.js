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

    let loading;
    if (this.props.loading) {
      loading = (
        <div className="loading-container">
          <h3 className="loading-header">Logging in ...</h3>
          <div className="loader"></div> 
        </div>
      );
    }

    return (
      <div className="login-page">
        <Link to="/" className="nutrition-counter-header">Nutrition Counter</Link>
        <LoginForm />
        {loading}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.authReducer.currentUser !== null,
  loading: state.authReducer.loading
});

export default connect(mapStateToProps)(LoginPage);