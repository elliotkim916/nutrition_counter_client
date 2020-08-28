import React, { useState, useRef, Suspense } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import RegistrationForm from './registration-form';
import { clearCreateUserError } from '../../store/actions/users';
import Loading from '../Loading/Loading';
import '../../index.scss';

const ErrorCmp = React.lazy(() => import('../Error/Error'));

const RegistrationPage = ({ history, loggedIn, loading, createUserError }) => {
  const [leaving, setLeaving] = useState(false);
  const RegistrationPageElement = useRef();

  const toLanding = () => {
    setLeaving(true);
    RegistrationPageElement.current.addEventListener('animationend', (e) => {
      if (e.animationName === 'opacity_out') {
        history.push('/');
      } else {
        return;
      }
    });
  };

  if (loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  if (loading) {
    return <Loading loadingMessage={'Creating user..'} />;
  }

  if (createUserError) {
    return (
      <Suspense fallback={<Loading loadingMessage={'Creating user..'} />}>
        <ErrorCmp
          errorMessage={
            'User already exists, please try a different username..'
          }
          clearError={clearCreateUserError}
        />
      </Suspense>
    );
  }

  return (
    <div
      className={`registration-page ${leaving ? 'opacity-out' : ''}`}
      ref={RegistrationPageElement}
    >
      <h3
        className="nutrition-counter-header"
        onClick={() => toLanding()}
        tabIndex="1"
      >
        Nutrition Counter
      </h3>
      <RegistrationForm />
    </div>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.authReducer.currentUser !== null,
  loading: state.authReducer.loading,
  createUserError: state.createUser.error,
});

export default connect(mapStateToProps)(RegistrationPage);
