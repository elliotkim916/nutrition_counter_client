import React from 'react';
import {connect} from 'react-redux';
import {get_exercise} from '../actions/exercise-search';

export class ExerciseSearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercise_value : ''
    }
  }
  
  exerciseInput(e) {
    this.setState({exercise_value: e.target.value});
  }  

  calculateActivity(e) {
    e.preventDefault();
    this.props.dispatch(get_exercise(this.state.exercise_value));
    this.setState({exercise_value : ''});
  }

  render() {
    return (
      <div className = "exercise-page">
        <form onSubmit = {(e) => this.calculateActivity(e)} className="exercise-form">
          <label htmlFor = "exercise">Enter your workout.  It can be anything from 30 min of weight lifting, 1 hour of yoga, or a 2 hour walk!</label><br/>
          <textarea 
            id = "exercise"
            type = "textarea" 
            placeholder = "ran 3 miles"
            onChange = {(e) => this.exerciseInput(e)}
            value = {this.state.exercise_value}
          >
          </textarea><br/>
          <button type = "submit" className="calculate-btn">Calculate Activity</button>
        </form>
      </div>
    );
  }
}

export default connect()(ExerciseSearchPage);