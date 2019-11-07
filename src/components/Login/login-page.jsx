import React from 'react';
import LoginForm from './login-form';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {clearAuthError} from '../../actions/auth';
import '../../index.scss';

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaving: false
    };
  }

  toLanding() {
    this.setState({leaving: true});
    const loginPage = this.refs.loginPage;
    loginPage.addEventListener("animationend", e => {
      if (e.animationName === "opacity_out") {
        this.props.history.push("/");
      } else {
        return;
      }
    });
  }

  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />;
    }

    if (this.props.loading) {
      return (
        <div className="loading-container">
          <h3 className="loading-header">Logging in ...</h3>
          <div className="loader"></div> 
        </div>
      );
    }

    return (
      <div className={`login-page ${this.state.leaving ? "opacity-out" : ""}`} ref="loginPage">
        <h3 className="nutrition-counter-header" onClick={() => this.toLanding()} tabIndex="1">Nutrition Counter</h3>
        {
          this.props.loginError ? 
          <div className="error-container">
            <div className="error-form">
              <h3 className="error-message">Login failed due to incorrect username or password..</h3>
              <button 
                type="button" 
                className="login-btn" 
                onClick={() => this.props.dispatch(clearAuthError())}
              >
                Okay
              </button>
            </div>
          </div> :
          null
        }
        <LoginForm />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.authReducer.currentUser !== null,
  loading: state.authReducer.loading,
  loginError: state.authReducer.error
});

export default connect(mapStateToProps)(LoginPage);