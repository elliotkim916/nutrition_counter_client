import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {login} from '../../actions/auth';
import '../../index.scss';

export class LoginForm extends React.Component {
  state = {
    username: '',
    password: '',
    usernameError: '',
    passwordError: ''
  };

  enterLoginInfo(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
      usernameError: '',
      passwordError: ''
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const {username, password} = this.state;

    if (username.length === 0) {
      this.setState({usernameError: 'Please enter username..'});
    }

    if (password.length === 0) {
      this.setState({passwordError: 'Please enter password..'});
    }

    if (username.length > 0 && password.length > 0) {
      this.props.dispatch(login(username, password));
    }
  }

  render() {
    let cssClass;
    if (this.props.authError) {
      cssClass = "login-form";
    } else {
      cssClass = "login-form fadeIn";
    }

    return (
      <div className={cssClass}>
        <h3 className="login-descriptor">Log in</h3>
        <form onSubmit={e => this.onSubmit(e)} className="form">
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            onChange={e => this.enterLoginInfo(e)}
            value={this.state.username}
          />
          {this.state.usernameError ? <span className="login-error-msg">{this.state.usernameError}</span> : null}
          <input 
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={e => this.enterLoginInfo(e)}
            value={this.state.password}
          />
          {this.state.passwordError ? <span className="login-error-msg">{this.state.passwordError}</span> : null}
          <button 
            type="submit"
            className="login-btn"
            disabled={this.props.pristine || this.props.submitting}  
          >
            LOG IN
          </button>
        </form>
        <span>Don't have an account? <Link to="/registration-page" className="link-text">Click here</Link></span>
        
        <div className="demo-container">
          <span className="demo-title">Demo Account</span><br/>
          <span>username: testone</span><br/>
          <span>password: testonepassword</span>
			  </div>
      </div>
    ); 
  }
}

const mapStateToProps = state => ({
  authError: state.authReducer.error
});

export default connect(mapStateToProps)(LoginForm);