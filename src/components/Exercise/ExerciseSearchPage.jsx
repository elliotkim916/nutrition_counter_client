import React from 'react';
import { connect } from 'react-redux';
import { searchFor } from '../../store/actions/search';
import { Formik, Form, Field } from 'formik';

const ExerciseSearchPage = ({ dispatch }) => {
  return (
    <div className="exercise-page">
      <img
        src="https://img.icons8.com/dusk/64/000000/dumbbell.png"
        alt="dumbbell"
        className="exercise-image"
      />
      <p className="exercise-header">Exercise</p>

      <Formik
        initialValues={{ exercise: '' }}
        onSubmit={(values, { resetForm }) => {
          dispatch(searchFor(values.exercise, 'exercise'));
          resetForm();
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <Form className="exercise-form" onSubmit={handleSubmit}>
            <label htmlFor="exercise">
              Enter your workout. Anything from 30 min of weight lifting, 1 hour
              of yoga, or a 2 hour walk!
            </label>
            <br />
            <Field
              id="exercise"
              as="textarea"
              placeholder="ran 3 miles"
              onChange={handleChange}
              value={values.exercise}
              required
            ></Field>
            <br />
            <button type="submit" className="calculate-btn">
              Calculate Activity
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default connect()(ExerciseSearchPage);
