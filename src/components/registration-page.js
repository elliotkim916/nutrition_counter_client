import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import RegistrationForm from './registration-form';
import '../stylesheets/components/_login-page.scss';

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

    let loading;
    if (this.props.loading) {
      loading = (
        <div className="loading-container">
          <h3 className="loading-header">Creating account ...</h3>
          <div className="loader"></div> 
        </div>
      );
    }

    return (
      <div className={`registration-page ${this.state.leaving || this.props.loading ? "opacity-out" : ""}`} ref="registrationPage">
        <h3 className="nutrition-counter-header" onClick={() => this.toLanding()}>Nutrition Counter</h3>
        <RegistrationForm/>
        {loading}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.authReducer.currentUser !== null,
  loading: state.authReducer.loading
});

export default connect(mapStateToProps)(RegistrationPage);          