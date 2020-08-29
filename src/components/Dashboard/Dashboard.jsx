import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  getProtectedData,
  deleteDataStart,
} from '../../store/actions/protected-data';
import requiresLogin from '../Login/RequiresLogin';
import NutritionTotals from '../Nutrition/NutritionTotals';
import ExerciseTotals from '../Exercise/ExerciseTotals';
import Header from '../Header/Header';
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
  const [index, setTabIndex] = useState(0);
  const DashboardElement = useRef();

  useEffect(() => {
    dispatch(getProtectedData('nutrition'));
    dispatch(getProtectedData('exercise'));
  }, []);

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
          {nutritionData.length > 0 && (
            <NutritionTotals deleteNutrition={deleteStart} />
          )}
          {exerciseData.length > 0 && (
            <ExerciseTotals deleteExercise={deleteStart} />
          )}
        </div>
      );

      tabs = (
        <div className="nutrition-totals-container">
          <Tabs
            selectedIndex={index}
            onSelect={(index, lastIndex, event) => {
              if (event.nativeEvent.type === 'click' && index !== lastIndex) {
                setTabIndex(index);
              }
            }}
          >
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
      <Header
        element={DashboardElement}
        dispatch={dispatch}
        history={history}
        setLeaving={setLeaving}
        location="dashboard"
      />

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
