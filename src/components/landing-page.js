import React from 'react';
import '../stylesheets/components/_landing-page.scss';
import {connect} from 'react-redux';

class LandingPage extends React.Component {
  render() {
    return (
      <div className="landing-page">
        <div className="shape-two">
          <p className="landing-login" onClick = {() => this.props.history.push('/login-page')}>Log in</p>
          <p className="landing-signup" onClick = {() => this.props.history.push('/registration-page')}>Sign up</p><br/>

          <h1 className="landing-page-header">Nutrition Counter</h1>

          <p className="descriptor-header">Stay On Track</p>
          <p className="landing-page-descriptor">The ultimate tool for tracking your diet and workouts</p>

          <button onClick={() => this.props.history.push('/registration-page')} className="landing-page-signup-btn">
            SIGN UP
          </button>
        </div>

        <div className="parent-container">
          <div className="container-one">
            <h3 className="container-headers">Weight Loss</h3>
            <img src="https://img.icons8.com/color/96/000000/apple.png" className="container-img" alt="apple"/>
            <ul>
              <li className="container-list-item">Search your meal</li>
              <li className="container-list-item">See the nutrtion broken down</li>
              <li className="container-list-item">Save all your food and keep track</li>
            </ul>
          </div>

          <div className="container-two">
            <h3 className="container-headers">Calorie Counter</h3>
            <img src="https://img.icons8.com/color/96/000000/treadmill.png" className="container-img" alt="treadmill"/>
            <ul>
              <li className="container-list-item">Enter your workout and duration</li>
              <li className="container-list-item">Search from a huge database</li>
              <li className="container-list-item">Track exercises</li>
            </ul>
          </div><br/>

          <div className="container-three">
            <h3 className="container-headers">Get Fit</h3>
            <img src="https://img.icons8.com/color/96/000000/bench-press-with-dumbbells.png" alt="weightlifter" className="benchpress-img"/>
            <img src="https://img.icons8.com/color/96/000000/weightlift.png" alt="weightlifter" className="weightlift-img"/>
            <ul>
              <li className="container-list-item">Compare calories burned to calories consumed</li>
              <li className="container-list-item">See if you are eating more than you are burning</li>
              <li className="container-list-item">Save and delete what you want</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(LandingPage);