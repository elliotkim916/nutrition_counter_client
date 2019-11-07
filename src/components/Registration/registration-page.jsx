import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import RegistrationForm from './registration-form';
import {clearCreateUserError} from '../../actions/users';
import '../../index.scss';

export class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaving: false
    };
  }

  toLanding() {
    this.setState({leaving: true});
    const registrationPage = this.refs.registrationPage;
    registrationPage.addEventListener('animationend', e => {
      if (e.animationName === "opacity_out") {
        this.props.history.push("/");
      } else {
        return;
      }
    });
  }

  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/dashboard"/>;
    }

    if (this.props.loading) {
      return (
        <div className="loading-container">
          <h3 className="loading-header">Registering ...</h3>
          <div className="loader"></div> 
        </div>
      );
    }

    return (
      <div className={`registration-page ${this.state.leaving ? "opacity-out" : ""}`} ref="registrationPage">
        <h3 className="nutrition-counter-header" onClick={() => this.toLanding()} tabIndex="1">Nutrition Counter</h3>
        {
          this.props.createUserError ? 
          <div className="error-container">
            <div className="error-form">
              <h3 className="error-message">User already exists, please try a different username..</h3>
                <button 
                  type="button" 
                  className="login-btn" 
                  onClick={() => this.props.dispatch(clearCreateUserError())}
                >
                  Okay
                </button>
            </div>
          </div> :
          null
        }
        <RegistrationForm/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.authReducer.currentUser !== null,
  loading: state.authReducer.loading,
  createUserError: state.createUser.error
});

export default connect(mapStateToProps)(RegistrationPage);          