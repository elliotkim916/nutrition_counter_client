import React from 'react';
import LoginForm from './login-form';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {clearAuthError} from '../../store/actions/auth';
import Loading from '../Loading/loading';
import '../../index.scss';
import Error from '../Error/error';

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
      return <Loading loadingMessage={'Logging in..'}/>;
    }

    return (
      <div className={`login-page ${this.state.leaving ? "opacity-out" : ""}`} ref="loginPage">
        <h3 className="nutrition-counter-header" onClick={() => this.toLanding()} tabIndex="1">Nutrition Counter</h3>
        {
          this.props.loginError ? 
          <Error 
            errorMessage={'Login failed due to incorrect username or password..'}
            clearError={clearAuthError}
          /> :
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