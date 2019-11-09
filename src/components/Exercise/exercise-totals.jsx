import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { deleteData, resetDelete } from '../../actions/protected-data';
import { DeleteSuccess, DeleteQuestion } from '../../shared/delete';

class ExerciseTotals extends React.Component {
  state = {
    deleteId: null,
    option: null
  }
  
  render() {
    const deleteStart = (
      this.props.deleteStart && this.state.option === 'exercise' ? 
      <DeleteQuestion 
        question='Are you sure you want to delete this?'
        yesDelete={deleteData}
        resetDelete={resetDelete}  
        dispatch={this.props.dispatch}
        deleteId={this.state.deleteId}
        option={this.state.option}
      /> :
      null
    );

    const deleteSuccess = (
      this.props.deleteFinish && this.state.option === 'exercise' ? 
      <DeleteSuccess 
        message='Exercise delete successful!' 
        dispatch={this.props.dispatch} 
        resetDelete={resetDelete}
        resetOption={() => this.setState({option: null})}
      /> :
      null
    );

    let exerciseTotals = '';
    if (this.props.exerciseData) {
      exerciseTotals = this.props.exerciseData.map((value, index) => 
        <div key = {index} className = "exercise_total">
          <h3 className="date">{moment(value.created).format('dddd MMMM Do YYYY, h:mm a')}</h3>
          <ul>
            <li><span className="list-title">Exercise Name :</span> {value.exerciseName}</li>
            <li><span className="list-title">Calories Burned :</span> {value.caloriesBurned}</li>
            <li><span className="list-title">Duration of workout :</span> {value.duration} minutes</li>
          </ul>
          <button 
            onClick = {e => {
              this.setState({deleteId: value._id, option: 'exercise'});
              this.props.deleteExercise();
            }} 
            className="delete-btn"
          >
            <span className="exit">x</span>
          </button>
          <div className="line"></div>
      </div>
      );
    }
  
    // when in tab format
    if (this.props.tab) {
      return (
        <React.Fragment>
          {deleteStart}
          {deleteSuccess}
          {exerciseTotals}
        </React.Fragment>
      );
    }

    return (
      <div className='exercise-totals-container'>
        <h3>Exercise Totals</h3>
        {deleteStart}
        {deleteSuccess}
        {exerciseTotals}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  exerciseData : state.protected.exerciseData,
  deleteFinish : state.protected.deleteFinish,
  deleteStart: state.protected.deleteStart
});

export default connect(mapStateToProps)(ExerciseTotals);
