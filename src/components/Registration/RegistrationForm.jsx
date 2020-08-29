import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../../store/actions/users';
import { login } from '../../store/actions/auth';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import '../../index.scss';

const RegistrationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string()
    .min(8, 'Must be at least 8 characters long')
    .required(),
  passwordConfirm: Yup.string()
    .min(8, 'Must be at least 8 characters long')
    .required(),
});

const RegistrationForm = React.memo(({ dispatch, newUser, error }) => {
  const inputElement = useRef();
  const formRef = useRef();

  useEffect(() => {
    inputElement.current.focus();

    if (newUser && !error && formRef.current) {
      if (newUser !== '') {
        dispatch(login(formRef.current.username, formRef.current.password));
      }
    }
  }, [newUser, error]);

  const onSubmit = (values, { resetForm }) => {
    const user = { username: values.username, password: values.password };
    formRef.current = user;
    dispatch(registerUser(user));
    resetForm();
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return 'Passwords must match';
    }
  };

  let cssClass;
  if (error) {
    cssClass = 'login-form';
  } else {
    cssClass = 'login-form fadeIn';
  }

  return (
    <div className={cssClass}>
      <h3 className="login-descriptor">Sign up</h3>
      <Formik
        validationSchema={RegistrationSchema}
        initialValues={{ username: '', password: '', passwordConfirm: '' }}
        onSubmit={onSubmit}
      >
        {({ handleChange, values, errors, touched, isValid }) => (
          <Form className="form">
            <Field
              name="username"
              type="text"
              placeholder="Enter username"
              onChange={handleChange}
              value={values.username}
              autoComplete="username"
              innerRef={inputElement}
            />
            {errors.username && touched.username && (
              <span className="login-error-msg">{errors.username}</span>
            )}

            <Field
              name="password"
              type="password"
              placeholder="Enter password"
              onChange={handleChange}
              value={values.password}
              autoComplete="new-password"
            />
            {errors.password && touched.password && (
              <span className="login-error-msg">{errors.password}</span>
            )}

            <Field
              name="passwordConfirm"
              type="password"
              placeholder="Confirm password"
              onChange={handleChange}
              value={values.passwordConfirm}
              autoComplete="new-password"
              validate={(value) =>
                validateConfirmPassword(values.password, value)
              }
            />
            {errors.passwordConfirm && touched.passwordConfirm && (
              <span className="login-error-msg">{errors.passwordConfirm}</span>
            )}

            <button
              type="submit"
              disabled={!isValid}
              className={
                !isValid ? 'registration-btn disabled' : 'registration-btn'
              }
            >
              REGISTER
            </button>
          </Form>
        )}
      </Formik>

      <span>
        Have an account?{' '}
        <Link to="/login-page" className="link-text">
          Click Here!
        </Link>
      </span>
    </div>
  );
});

const mapStateToProps = (state) => ({
  newUser: state.createUser.user,
  error: state.createUser.error,
});

export default connect(mapStateToProps)(RegistrationForm);
