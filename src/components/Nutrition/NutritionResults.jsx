import React, { useState, useRef, useCallback, useMemo, Suspense } from 'react';
import { clearAuth } from '../../store/actions/auth';
import { clearAuthToken } from '../../shared/local-storage';
import NutritionResultsTotals from '../Nutrition/NutritionResultsTotals';
import Search from '../Dashboard/Search';
import { connect } from 'react-redux';
import {
  addProtectedData,
  clearError,
} from '../../store/actions/protected-data';
import { clearSearchError } from '../../store/actions/search';
import requiresLogin from '../Login/requires-login';
import Loading from '../Loading/Loading';
import '../../index.scss';

const AddSuccessCmp = React.lazy(() => import('../../shared/add'));
const AddErrorCmp = React.lazy(() => import('../Error/Error'));
const SearchErrorCmp = React.lazy(() => import('../Error/Error'));

const NutritionResults = ({
  dispatch,
  history,
  loading,
  addError,
  nutritionError,
  nutritionResults,
}) => {
  const [leaving, setLeaving] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const nutritionResultsElement = useRef();

  const logOut = () => {
    setLeaving(true);
    nutritionResultsElement.current.addEventListener('animationend', (e) => {
      if (e.animationName === 'opacity_out') {
        dispatch(clearAuth());
        clearAuthToken();
        history.push('/login-page');
      } else {
        return;
      }
    });
  };

  const toDashboard = () => {
    setLeaving(true);
    nutritionResultsElement.current.addEventListener('animationend', (e) => {
      if (e.animationName === 'opacity_out') {
        history.push('/dashboard');
      } else {
        return;
      }
    });
  };

  const onAdd = useCallback((e, nutritionTotals, option) => {
    e.preventDefault();
    dispatch(addProtectedData(nutritionTotals, option));
    setAddSuccess(true);
  }, []);

  const nutritionTotal = (nutrition) => (nutrition === null ? 0 : nutrition);

  const nutritionList = useMemo(() => {
    return nutritionResults.map((result, index) => (
      <li key={index} className="nutrition-list-item">
        <h3 className="food-name">
          {result.food_name
            .toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')}
        </h3>
        <img
          src={`${result.photo.thumb}`}
          className="result-image"
          alt="food item"
        />
        <ul className="nutrition-facts">
          <li>
            <span>Calories : </span>
            {nutritionTotal(result.nf_calories)}
          </li>
          <li>
            <span>Total Fat : </span>
            {nutritionTotal(result.nf_total_fat)}g
          </li>
          <li>
            <span>Saturated Fat : </span>
            {nutritionTotal(result.nf_saturated_fat)}g
          </li>
          <li>
            <span>Cholesterol : </span>
            {nutritionTotal(result.nf_cholesterol)}mg
          </li>
          <li>
            <span>Sodium : </span>
            {nutritionTotal(result.nf_sodium)}mg
          </li>
          <li>
            <span>Potassium : </span>
            {nutritionTotal(result.nf_potassium)}mg
          </li>
          <li>
            <span>Carbohydrates : </span>
            {nutritionTotal(result.nf_total_carbohydrate)}g
          </li>
          <li>
            <span>Dietary Fiber : </span>
            {nutritionTotal(result.nf_dietary_fiber)}g
          </li>
          <li>
            <span>Sugars : </span>
            {nutritionTotal(result.nf_sugars)}g
          </li>
          <li>
            <span>Protein : </span>
            {nutritionTotal(result.nf_protein)}g
          </li>
        </ul>
      </li>
    ));
  }, [nutritionResults]);

  let addSuccessful, isError, isLoading, searchError, errorStatus;
  if (addSuccess) {
    addSuccessful = (
      <Suspense fallback={<Loading loadingMessage="Result is loading.." />}>
        <AddSuccessCmp
          message="You have saved your nutrition!"
          clearAddSuccess={() => setAddSuccess(false)}
        />
      </Suspense>
    );
  } else {
    addSuccessful = null;
  }

  if (addError) {
    isError = (
      <Suspense fallback={<Loading loadingMessage="Result is loading.." />}>
        <AddErrorCmp
          errorMessage="Sorry, your nutrition was unable to be saved.."
          clearError={clearError}
        />
      </Suspense>
    );
  } else {
    isError = null;
  }

  if (loading && !nutritionError) {
    isLoading = <Loading loadingMessage="Result is loading.." />;
  } else {
    isLoading = null;
  }

  if (nutritionError) {
    searchError = (
      <Suspense fallback={<Loading loadingMessage="Result is loading.." />}>
        <SearchErrorCmp
          errorMessage="Sorry, no results were found.."
          clearError={clearSearchError}
        />
      </Suspense>
    );

    errorStatus = nutritionError.status;
  } else {
    searchError = null;
    errorStatus = null;
  }

  return (
    <section
      className={`nutrition-search-results ${leaving ? 'opacity-out' : ''}`}
      ref={nutritionResultsElement}
    >
      <div className="shape">
        <span
          onClick={() => toDashboard()}
          tabIndex="1"
          className="go-home-btn"
        >
          Home
        </span>
        <span onClick={() => logOut()} tabIndex="2" className="logout-btn">
          Log Out
        </span>
        <br />
        <h1 className="title-header">Nutrition Counter</h1>
        <Search location="nutrition-results" />
      </div>

      <ul
        className={
          !loading && !errorStatus
            ? 'nutrition-results fadeIn'
            : 'nutrition-results'
        }
      >
        {nutritionList}
      </ul>
      <NutritionResultsTotals onAdd={onAdd} errorStatus={errorStatus} />

      {addSuccessful}
      {isError}
      {isLoading}
      {searchError}
    </section>
  );
};

const mapStateToProps = (state) => ({
  loading: state.searchReducer.loading,
  nutritionError: state.searchReducer.error,
  nutritionResults: state.searchReducer.nutrition,
  addError: state.protected.error,
});

export default requiresLogin()(connect(mapStateToProps)(NutritionResults));
