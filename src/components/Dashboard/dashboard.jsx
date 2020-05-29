import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../../store/actions/auth';
import {clearAuthToken} from '../../shared/local-storage';
import {getProtectedData, deleteDataStart} from '../../store/actions/protected-data';
import requiresLogin from '../Login/requires-login';
import Search from './search';
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
    }, 400);
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
    let fullPageTotals, tabs;

    fullPageTotals = (
      <div className="totals-container">
        <NutritionTotals deleteNutrition={this.deleteStart} />
        <ExerciseTotals deleteExercise={this.deleteStart} />
      </div>
    );

    tabs = (
      <div className ="nutrition-totals-container">
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
    );
    
    return (
      <div className={`dashboard ${this.state.leaving ? "opacity-out" : ""}`} ref="thisDashboard">
        <div className="shape">
          <span className="log-out" onClick={() => this.logOut()} tabIndex="1">Log Out</span><br/>
          <h1 className="title-header">Nutrition Counter</h1>
          <Search/>
        </div>

        <img src={harvest} alt="nutrition" className="tossing" />
        <h1 className="welcome-header">Welcome {this.props.username.charAt(0).toUpperCase() + this.props.username.slice(1)}</h1>
        {fullPageTotals}
        {tabs}        
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