import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { searchFor } from '../../store/actions/search';
import requiresLogin from '../Login/requires-login';
import { Formik, Form, Field } from 'formik';

const NutritionSearchPage = ({ dispatch }) => {
  const textAreaElement = useRef();

  useEffect(() => {
    textAreaElement.current.focus();
  }, []);

  return (
    <div className="nutrition-page">
      <img
        src="https://img.icons8.com/dusk/64/000000/ingredients.png"
        alt="food"
        className="food-image"
      />
      <p className="nutrition-header">Food</p>

      <Formik
        initialValues={{ meal: '' }}
        onSubmit={(values, { resetForm }) => {
          dispatch(searchFor(values.meal, 'nutrition'));
          resetForm();
        }}
      >
        {({ handleSubmit, handleChange, values }) => (
          <Form onSubmit={handleSubmit} className="nutrition-form">
            <label htmlFor="meal">
              Enter your meal, snack, or anything you consumed to see the total
              nutrition breakdown.
            </label>
            <br />
            <Field
              id="meal"
              as="textarea"
              placeholder="1 cup mashed potatoes and 2 tbsp gravy"
              onChange={handleChange}
              value={values.meal}
              innerRef={textAreaElement}
              required
            ></Field>
            <br />
            <button type="submit" className="calculate-btn">
              Calculate Meal
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => ({
  nutritionResults: state.searchReducer.nutrition,
});

export default requiresLogin()(connect(mapStateToProps)(NutritionSearchPage));
