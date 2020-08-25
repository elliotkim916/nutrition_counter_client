import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import RegistrationForm from './registration-form';
import { clearCreateUserError } from '../../store/actions/users';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';
import '../../index.scss';

export class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaving: false,
    };
  }

  toLanding() {
    this.setState({ leaving: true });
    const registrationPage = this.refs.registrationPage;
    registrationPage.addEventListener('animationend', (e) => {
      if (e.animationName === 'opacity_out') {
        this.props.history.push('/');
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
      return <Loading loadingMessage={'Creating user..'} />;
    }

    return (
      <div
        className={`registration-page ${
          this.state.leaving ? 'opacity-out' : ''
        }`}
        ref="registrationPage"
      >
        <h3
          className="nutrition-counter-header"
          onClick={() => this.toLanding()}
          tabIndex="1"
        >
          Nutrition Counter
        </h3>
        {this.props.createUserError ? (
          <Error
            errorMessage={
              'User already exists, please try a different username..'
            }
            clearError={clearCreateUserError}
          />
        ) : null}
        <RegistrationForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.authReducer.currentUser !== null,
  loading: state.authReducer.loading,
  createUserError: state.createUser.error,
});

export default connect(mapStateToProps)(RegistrationPage);
