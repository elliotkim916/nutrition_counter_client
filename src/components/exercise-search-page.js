import React from 'react';
import './exercise-search-page.css';

export default class ExerciseSearchPage extends React.Component {
  calculateActivity(e) {
    e.preventDefault();
    console.log('clicked');
  }

  render() {
    return (
      <div className="exercise-page">
        <form>
          <label htmlFor="exercise">Enter your workout.  It can be anything from 30 min of weight lifting, 1 hour of yoga, or a 2 hour walk!</label><br/>
          <textarea 
            id="exercise"
            type="textarea" 
            placeholder="ran 3 miles"
          >
          </textarea><br/>
          <button type="submit" onClick={(e) => this.calculateActivity(e)}>Calculate Activity</button>
        </form>
      </div>
    );
  }
}