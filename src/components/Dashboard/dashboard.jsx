import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../../actions/auth';
import {clearAuthToken} from '../../local-storage';
import {getProtectedData, deleteDataStart} from '../../actions/protected-data';
import requiresLogin from '../Login/requires-login';
import NutritionSearchPage from '../Nutrition/nutrition-search-page';
import ExerciseSearchPage from '../Exercise/exercise-search-page';
import NutritionTotals from '../Nutrition/nutrition-totals';
import ExerciseTotals from '../Exercise/exercise-totals';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import harvest from '../../stylesheets/images/harvest.png';
import "react-tabs/style/react-tabs.css";
import '../../index.scss';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaving: false
    };

    this.deleteStart = this.deleteStart.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.dispatch(getProtectedData('nutrition'));
      this.props.dispatch(getProtectedData('exercise'));
    }, 50);
  }

  logOut() {
    this.setState({leaving: true});
    const thisDashboard = this.refs.thisDashboard;
    thisDashboard.addEventListener('animationend', e => {
      if (e.animationName === 'opacity_out') {
        this.props.dispatch(clearAuth());
        clearAuthToken();
        this.props.history.push('/login-page');
      } else {
        return;
      }
    });
  }

  deleteStart() {
    this.props.dispatch(deleteDataStart());
  }

  render() {    
    return (
      <div className={`dashboard ${this.state.leaving ? "opacity-out" : ""}`} ref="thisDashboard">
        <div className="shape">
          <span className="log-out" onClick={() => this.logOut()} tabIndex="1">Log Out</span><br/>
          <h1 className="title-header">Nutrition Counter</h1>
          <NutritionSearchPage/>
          <ExerciseSearchPage/><br/>
        </div>

        <img src={harvest} alt="nutrition" className="tossing" />
        <h1 className="welcome-header">Welcome {this.props.username.charAt(0).toUpperCase() + this.props.username.slice(1)}</h1>
        {
          this.props.nutritionData|| this.props.exerciseData ?
          <React.Fragment>
            <div className="totals-container">
              <NutritionTotals deleteNutrition={this.deleteStart}/>
              <ExerciseTotals deleteExercise={this.deleteStart}/>
            </div>

            <div className ='nutrition-totals-container'>
              <Tabs>
                <TabList>
                  <Tab>Nutrition Totals</Tab>
                  <Tab>Exercise Totals</Tab>
                </TabList>
          
                <TabPanel>
                  <div>  
                    <NutritionTotals tab={true} deleteNutrition={this.deleteStart}/>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div>
                    <ExerciseTotals tab={true} deleteExercise={this.deleteStart}/>  
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </React.Fragment> :
          null
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  exerciseData : state.protected.exerciseData, 
  nutritionData : state.protected.nutritionData,
  username : state.authReducer.currentUser.username
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));