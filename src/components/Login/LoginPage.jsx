import React, { useState, useRef, Suspense } from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { clearAuthError } from '../../store/actions/auth';
import Loading from '../Loading/Loading';
import '../../index.scss';

const ErrorCmp = React.lazy(() => import('../Error/Error'));

const LoginPage = ({ loggedIn, loading, loginError, history }) => {
  const [leaving, setLeaving] = useState(false);
  const loginPageElement = useRef();

  const toLanding = () => {
    setLeaving(true);
    loginPageElement.current.addEventListener('animationend', (e) => {
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

  return (
    <div
      className={`login-page ${leaving ? 'opacity-out' : ''}`}
      ref={loginPageElement}
    >
      <h3
        className="nutrition-counter-header"
        onClick={() => toLanding()}
        tabIndex="1"
      >
        Nutrition Counter
      </h3>
      {loading && <Loading loadingMessage={'Logging in..'} />}
      {loginError && (
        <Suspense fallback={<Loading loadingMessage="Loggin in.." />}>
          <ErrorCmp
            errorMessage={
              'Login failed due to incorrect username or password..'
            }
            clearError={clearAuthError}
          />
        </Suspense>
      )}
      <LoginForm />
    </div>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.authReducer.currentUser !== null,
  loading: state.authReducer.loading,
  loginError: state.authReducer.error,
});

export default connect(mapStateToProps)(LoginPage);
