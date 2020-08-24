import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../../store/actions/auth';
import { clearAuthToken } from '../../shared/local-storage';
import {
  getProtectedData,
  deleteDataStart,
} from '../../store/actions/protected-data';
import requiresLogin from '../Login/requires-login';
import Search from './Search';
import NutritionTotals from '../Nutrition/nutrition-totals';
import ExerciseTotals from '../Exercise/exercise-totals';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import harvest from '../../stylesheets/images/harvest.png';
import 'react-tabs/style/react-tabs.css';
import '../../index.scss';

const Dashboard = ({
  dispatch,
  history,
  exerciseData,
  nutritionData,
  username,
}) => {
  const [leaving, setLeaving] = useState(false);
  const DashboardElement = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getProtectedData('nutrition'));
      dispatch(getProtectedData('exercise'));
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const logOut = () => {
    setLeaving(true);
    DashboardElement.current.addEventListener('animationend', (e) => {
      if (e.animationName === 'opacity_out') {
        dispatch(clearAuth());
        clearAuthToken();
        history.push('/login-page');
      } else {
        return;
      }
    });
  };

  const deleteStart = useCallback(() => {
    dispatch(deleteDataStart());
  }, []);

  let fullPageTotals, tabs;

  if (exerciseData && nutritionData) {
    if (exerciseData.length === 0 && nutritionData.length === 0) {
      fullPageTotals = null;
      tabs = null;
    } else {
      fullPageTotals = (
        <div className="totals-container">
          <NutritionTotals deleteNutrition={deleteStart} />
          <ExerciseTotals deleteExercise={deleteStart} />
        </div>
      );

      tabs = (
        <div className="nutrition-totals-container">
          <Tabs>
            <TabList>
              <Tab>Nutrition Totals</Tab>
              <Tab>Exercise Totals</Tab>
            </TabList>

            <TabPanel>
              <div>
                <NutritionTotals tab={true} deleteNutrition={deleteStart} />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <ExerciseTotals tab={true} deleteExercise={deleteStart} />
              </div>
            </TabPanel>
          </Tabs>
        </div>
      );
    }
  }

  return (
    <div
      className={`dashboard ${leaving ? 'opacity-out' : ''}`}
      ref={DashboardElement}
    >
      <div className="shape">
        <span className="log-out" onClick={() => logOut()} tabIndex="1">
          Log Out
        </span>
        <br />
        <h1 className="title-header">Nutrition Counter</h1>
        <Search />
      </div>

      <img src={harvest} alt="nutrition" className="tossing" />
      <h1 className="welcome-header">
        Welcome {username.charAt(0).toUpperCase() + username.slice(1)}
      </h1>
      {fullPageTotals}
      {tabs}
    </div>
  );
};

const mapStateToProps = (state) => ({
  exerciseData: state.protected.exerciseData,
  nutritionData: state.protected.nutritionData,
  username: state.authReducer.currentUser.username,
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
