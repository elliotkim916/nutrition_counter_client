import React from 'react';
import '../stylesheets/components/_landing-page.scss';
import {connect} from 'react-redux';

class LandingPage extends React.Component {
  render() {
    return (
      <div className="landing-page">
        <div className="shape-two">
          <p className="landing-login" onClick = {() => this.props.history.push('/login-page')}>Log In</p>
          <p className="landing-signup" onClick = {() => this.props.history.push('/registration-page')}>Sign Up</p><br/>

          <h1 className="landing-page-header">Nutrition Counter</h1>

          <p className="descriptor-header">STAY ON TRACK</p>
          <p className="landing-page-descriptor">The ultimate tool for tracking your diet and workouts</p>

          <button onClick={() => this.props.history.push('/registration-page')} className="landing-page-signup-btn">
            SIGN UP
          </button>
        </div>

        <div className="container-one">
          <h3 className="container-headers">Weight Loss</h3>
          <ul>
            <li>Search your meal</li>
            <li>See the nutrtion broken down into calories, fats, carbs, and more</li>
            <li>Save all your food and keep track</li>
          </ul>
        </div>

        <div className="container-two">
          <h3 className="container-headers">Calorie Counter</h3>
          <ul>
            <li>Enter your workout and duration</li>
            <li>Search from a huge database</li>
            <li>Track exercises</li>
          </ul>
        </div>

        <div className="container-three">
          <h3 className="container-headers">Get Fit</h3>
          <ul>
            <li>Compare calories burned to calories consumed</li>
            <li>You can always see if you are eating more than you are burning</li>
            <li>Save and delete what you want to update your dashboard</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default connect()(LandingPage);