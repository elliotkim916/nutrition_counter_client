import React from 'react';
import '../../index.scss';
import { clearAuth } from '../../store/actions/auth';
import { clearAuthToken } from '../../shared/local-storage';
import Search from '../Dashboard/Search';

const Header = React.memo(
  ({ element, dispatch, history, setLeaving, location }) => {
    const logOut = () => {
      setLeaving(true);
      element.current.addEventListener('animationend', (e) => {
        if (e.animationName === 'opacity_out') {
          dispatch(clearAuth());
          clearAuthToken();
          history.push('/login-page');
        } else {
          return;
        }
      });
    };

    const toDashboard = () => {
      setLeaving(true);
      element.current.addEventListener('animationend', (e) => {
        if (e.animationName === 'opacity_out') {
          history.push('/dashboard');
        } else {
          return;
        }
      });
    };

    return (
      <div className="shape">
        <span
          onClick={() => toDashboard()}
          tabIndex="1"
          className="go-home-btn"
        >
          Home
        </span>
        <span onClick={() => logOut()} tabIndex="2" className="logout-btn">
          Log Out
        </span>
        <br />
        <h1 className="title-header">Nutrition Counter</h1>
        <Search location={location} />
      </div>
    );
  }
);

export default Header;
