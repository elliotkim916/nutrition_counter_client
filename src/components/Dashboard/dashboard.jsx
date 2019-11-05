import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../../actions/auth';
import {clearAuthToken} from '../../local-storage';
import {fetchProtectedData, deleteData} from '../../actions/protected-data';
import {getExercise, deleteExercise} from '../../actions/protected-exercise-data';
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

    this.deleteNutrition = this.deleteNutrition.bind(this);
    this.deleteExercise = this.deleteExercise.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
    this.props.dispatch(getExercise());
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

  deleteNutrition(e, id) {
    e.preventDefault();
    const result = window.confirm('Are you sure you want to delete?  If so, click OK');
    if (result) {
      this.props.dispatch(deleteData(id));
    }
  }

  deleteExercise(e, id) {
    e.preventDefault();
    const result = window.confirm('Are you sure you want to delete?  If so, click OK');
    if (result) {
      this.props.dispatch(deleteExercise(id));
    }
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
          this.props.protectedData.length > 0 ?
          <React.Fragment>
            <div className="totals-container">
              <NutritionTotals deleteNutrition={this.deleteNutrition}/>
              <ExerciseTotals deleteExercise={this.deleteExercise}/>
            </div>

            <div className ='nutrition-totals-container'>
              <Tabs>
                <TabList>
                  <Tab>Nutrition Totals</Tab>
                  <Tab>Exercise Totals</Tab>
                </TabList>
          
                <TabPanel>
                  <div>  
                    <NutritionTotals tab={true}/>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div>
                    <ExerciseTotals tab={true}/>  
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
  exerciseData : state.exerciseDataReducer.exerciseData, 
  protectedData : state.protected.protected_data,
  username : state.authReducer.currentUser.username
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));