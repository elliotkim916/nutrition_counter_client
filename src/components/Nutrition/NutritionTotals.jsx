import React from 'react';
import { connect } from 'react-redux';
import { deleteData, resetDelete } from '../../store/actions/protected-data';
import { DeleteSuccess, DeleteQuestion } from '../../shared/delete';
import NutritionDashboardListItem from './NutritionDashboardListItem';
import '../../index.scss';

class NutritionTotals extends React.Component {
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

  render() {
    const deleteStart =
      this.props.deleteStart && this.state.option === 'nutrition' ? (
        <DeleteQuestion
          question="Are you sure you want to delete this?"
          yesDelete={deleteData}
          resetDelete={resetDelete}
          dispatch={this.props.dispatch}
          deleteId={this.state.deleteId}
          option={this.state.option}
        />
      ) : null;

    const deleteSuccess =
      this.props.deleteFinish && this.state.option === 'nutrition' ? (
        <DeleteSuccess
          message="Nutrition delete successful!"
          dispatch={this.props.dispatch}
          resetDelete={resetDelete}
          resetOption={() => this.setState({ option: null })}
        />
      ) : null;

    let nutritionTotals = '';
    if (this.props.nutritionData) {
      nutritionTotals = this.props.nutritionData.map((value, index) => {
        return (
          <NutritionDashboardListItem
            index={index}
            value={value}
            updateIdAndOption={this.updateIdAndOption}
            deleteNutrition={this.props.deleteNutrition}
          />
        );
      });
    }

    // when in tab format
    if (this.props.tab) {
      return (
        <React.Fragment>
          {deleteStart}
          {deleteSuccess}
          {nutritionTotals}
        </React.Fragment>
      );
    }

    return (
      <div className="nutrition-totals-container">
        <h3>Nutrition Totals</h3>
        {deleteStart}
        {deleteSuccess}
        {nutritionTotals}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  nutritionData: state.protected.nutritionData,
  deleteFinish: state.protected.deleteFinish,
  deleteStart: state.protected.deleteStart,
});

export default connect(mapStateToProps)(NutritionTotals);
