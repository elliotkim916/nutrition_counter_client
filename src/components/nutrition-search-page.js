import React from 'react';
import './nutrition-search-page.css';

export default class NutritionSearchPage extends React.Component {
  calculateMeal(e) {
    e.preventDefault();
    console.log('clicked');
  }

  render() {
    return (
      <div className="nutrition-page">
        <form>
          <label htmlFor="meal">Enter your meal, snack, or anything you consumed to see the total nutrition breakdown.</label><br/>
          <textarea
            id="meal" 
            type="text" 
            placeholder="1 cup mashed potatoes and 2 tbsp gravy"
          >
          </textarea><br/>
          <button type="submit" onClick={(e) => this.calculateMeal(e)}>Calculate Meal</button>
        </form>
      </div>
    );
  }
}