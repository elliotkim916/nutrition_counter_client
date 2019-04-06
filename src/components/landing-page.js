import React from 'react';
import '../stylesheets/components/_all.scss';
import '../stylesheets/components/_landing-page.scss';
import {connect} from 'react-redux';
// import {Link} from 'react-router-dom';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaving: false,
      mounted: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({mounted: true});
    }, 0.0003);
  }

  componentWillUnmount() {
    this.setState({mounted: false});
  }

  logIn() {
    this.setState({leaving: true});
    const landingPage = this.refs.landingPage;
    landingPage.addEventListener('animationend', e => {
      if (e.animationName === "opacity_out") {
        this.props.history.push("/login-page");
      } else {
        return;
      }
    });
  }

  signUp() {
    this.setState({leaving: true});
    const landingPage = this.refs.landingPage;
    landingPage.addEventListener('animationend', e => {
      if (e.animationName === "opacity_out") {
        this.props.history.push("/registration-page");
      } else {
        return;
      }
    });
  }


  render() {
    return (
      <div className={`landing-page ${this.state.leaving ? "opacity-out" : ""}`} ref="landingPage">
        <div className="shape-two">
          <span className="landing-login" onClick={() => this.logIn()} tabIndex="1">Log in</span>
          <span className="landing-signup" onClick={() => this.signUp()} tabIndex="2">Sign up</span><br/>

          <h1 className={`landing-page-header ${this.state.mounted ? "fadeIn" : ""}`}>Nutrition Counter</h1>

          <p className="descriptor-header">Stay On Track</p>
          <p className="landing-page-descriptor">The ultimate tool for tracking your diet and workouts</p>

          <button onClick={() => this.signUp()} className="landing-page-signup-btn">
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