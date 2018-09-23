import React from 'react';
import './exercise-search-page.css';
import {connect} from 'react-redux';
import {get_exercise} from '../actions/exercise-search';

export class ExerciseSearchPage extends React.Component {
  calculateActivity(e) {
    e.preventDefault();
    this.props.dispatch(get_exercise(this.input.value));
    this.input.value = '';
  }

  render() {
    return (
      <div className="exercise-page">
        <form onSubmit={(e) => this.calculateActivity(e)}>
          <label htmlFor="exercise">Enter your workout.  It can be anything from 30 min of weight lifting, 1 hour of yoga, or a 2 hour walk!</label><br/>
          <textarea 
            id="exercise"
            type="textarea" 
            placeholder="ran 3 miles"
            ref={input => this.input = input}
          >
          </textarea><br/>
          <button type="submit">Calculate Activity</button>
        </form>
      </div>
    );
  }
}

export default connect()(ExerciseSearchPage);