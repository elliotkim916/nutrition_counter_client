import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../store/actions/auth';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import '../../index.scss';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

const LoginForm = ({ authError, dispatch }) => {
  const inputElement = useRef();

  useEffect(() => {
    inputElement.current.focus();
  }, []);

  let cssClass;
  if (authError) {
    cssClass = 'login-form';
  } else {
    cssClass = 'login-form fadeIn';
  }

  return (
    <div className={cssClass}>
      <h3 className="login-descriptor">Log in</h3>
      <Formik
        validationSchema={LoginSchema}
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={(values, { resetForm }) => {
          dispatch(login(values.username, values.password));
          resetForm();
        }}
      >
        {({ handleChange, values, errors, touched }) => (
          <Form className="form">
            <Field
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={handleChange}
              value={values.username}
              innerRef={inputElement}
            />
            {errors.username && touched.username && (
              <span className="login-error-msg">{errors.username}</span>
            )}

            <Field
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              value={values.password}
            />
            {errors.password && touched.password && (
              <span className="login-error-msg">{errors.password}</span>
            )}

            <button type="submit" className="login-btn">
              LOG IN
            </button>
          </Form>
        )}
      </Formik>

      <span>
        Don't have an account?{' '}
        <Link to="/registration-page" className="link-text">
          Click here
        </Link>
      </span>

      <div className="demo-container">
        <span className="demo-title">Demo Account</span>
        <br />
        <span>username: testone</span>
        <br />
        <span>password: testonepassword</span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authError: state.authReducer.error,
});

export default connect(mapStateToProps)(LoginForm);
