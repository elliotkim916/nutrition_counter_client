import React from 'react';
import './landing-page.css';
import {connect} from 'react-redux';
import {beginApp} from '../actions/begin-now';

export class LandingPage extends React.Component {
  startApp() {
    this.props.dispatch(beginApp());
  }

  render() {
    return (
      <div className="landing-page">
        <h1>Nutrition Counter</h1>

        <h4>Enter your meal and see the nutrition information of your entire meal broken down into calories, fats, carbohydrates, and more!</h4>

        <h4>See your meal broken down by ingredients and see an image and the nutrition of each specific ingredient.</h4>

        <h4>Enter your workout and the duration of your workout and get back a best estimation of how many calories you burned.</h4>

        <button 
          type="submit" 
          onClick={() => this.startApp()}
        >
        Begin Now
        </button>
      </div>
    );
  }
}

export default connect()(LandingPage);