import React from 'react';
import { connect } from 'react-redux';
import { deleteData, resetDelete } from '../../store/actions/protected-data';
import { DeleteSuccess, DeleteQuestion } from '../../shared/delete';
import ExerciseDashboardListItem from './ExerciseDashboardListItem';

class ExerciseTotals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteId: null,
      option: null,
    };

    this.updateIdAndOption = this.updateIdAndOption.bind(this);
  }

  updateIdAndOption(id, option) {
    this.setState({
      deleteId: id,
      option,
    });
  }

  deleteStart() {
    if (this.props.deleteStart && this.state.option === 'exercise') {
      return (
        <DeleteQuestion
          question="Are you sure you want to delete this?"
          yesDelete={deleteData}
          resetDelete={resetDelete}
          dispatch={this.props.dispatch}
          deleteId={this.state.deleteId}
          option={this.state.option}
        />
      );
    } else {
      return null;
    }
  }

  deleteSuccess() {
    if (this.props.deleteFinish && this.state.option === 'exercise') {
      return (
        <DeleteSuccess
          message="Exercise delete successful!"
          dispatch={this.props.dispatch}
          resetDelete={resetDelete}
          resetOption={() => this.setState({ option: null })}
        />
      );
    } else {
      return null;
    }
  }

  exerciseData() {
    if (this.props.exerciseData) {
      return this.props.exerciseData.map((value, index) => (
        <ExerciseDashboardListItem
          value={value}
          index={index}
          deleteExercise={this.props.deleteExercise}
          updateIdAndOption={this.updateIdAndOption}
        />
      ));
    } else {
      return null;
    }
  }

  render() {
    // when in tab format
    if (this.props.tab) {
      return (
        <React.Fragment>
          {this.deleteStart()}
          {this.deleteSuccess()}
          {this.exerciseData()}
        </React.Fragment>
      );
    }

    return (
      <div className="exercise-totals-container">
        <h3>Exercise Totals</h3>
        {this.deleteStart()}
        {this.deleteSuccess()}
        {this.exerciseData()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  exerciseData: state.protected.exerciseData,
  deleteFinish: state.protected.deleteFinish,
  deleteStart: state.protected.deleteStart,
});

export default connect(mapStateToProps)(ExerciseTotals);
