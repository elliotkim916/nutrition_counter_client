import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {registerUser} from '../../actions/users';
import {login} from '../../actions/auth';
import '../../index.scss';

export class RegistrationForm extends React.Component {
  state = {
    username: '',
    password: '',
    passwordConfirm: '',
    usernameError: '',
    passwordError: '',
    passwordConfirmError: ''
  };

  setRegistrationInfo(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
      usernameError: '',
      passwordError: '',
      passwordConfirmError: ''
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const {username, password, passwordConfirm} = this.state;

    if (username.length === 0) {
      this.setState({usernameError: 'Please enter a username..'});
    }

    if (username.trim() === '' && username.length > 0) {
      this.setState({usernameError: 'Username cannot start or end with whitespace..'});
    }

    if (password.length === 0) {
      this.setState({passwordError: 'Please enter a password..'});
    }

    if (password.trim() === '' && password.length > 0) {
      this.setState({passwordError: 'Password cannot start or end with whitespace..'});
    }

    if (passwordConfirm.length === 0) {
      this.setState({passwordConfirmError: 'Please confirm your password..'});
    }

    if (password !== passwordConfirm) {
      this.setState({passwordConfirmError: 'Your passwords do not match, please try again..'});
    }

    if (username.length > 0 && password.length > 0 && passwordConfirm.length > 0) {
      const user = {username, password}; 
      console.log(user);
      this.props.dispatch(registerUser(user));
      this.setState({username: '', password: '', passwordConfirm: ''});
    }
    
    if (this.props.newUser) {
      if (this.props.newUser.username) {
        this.props.dispatch(login(username, password));
      }
    }
  }

  render() {
    return (
      <div className="login-form fadeIn">
        <h3 className="login-descriptor">Sign up</h3>
        <form onSubmit={(e) => this.onSubmit(e)} className="form">
          <input 
            name="username"
            type="text"
            placeholder="Enter username"
            onChange={e => this.setRegistrationInfo(e)}
            value={this.state.username}
          />
          {this.state.usernameError ? <span className="login-error-msg">{this.state.usernameError}</span> : null}
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            onChange={e => this.setRegistrationInfo(e)}
            value={this.state.password}
          />
          {this.state.passwordError ? <span className="login-error-msg">{this.state.passwordError}</span> : null}
          <input
            name="passwordConfirm"
            type="password"
            placeholder="Confirm password"
            onChange={e => this.setRegistrationInfo(e)}
            value={this.state.passwordConfirm}
          />
          {this.state.passwordConfirmError ? <span className="login-error-msg">{this.state.passwordConfirmError}</span> : null}
          <button 
            type="submit"
            disabled={this.props.pristine || this.props.submitting}
            className="registration-btn"
          >
          REGISTER
          </button>
        </form>
        <span>Have an account?  <Link to="/login-page" className="link-text">Click Here!</Link></span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.createUser.loading,
  newUser: state.createUser.user,
  error: state.createUser.error
});

export default connect(mapStateToProps)(RegistrationForm);