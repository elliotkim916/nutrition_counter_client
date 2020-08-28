import React, { useState, useRef, useCallback, useMemo, Suspense } from 'react';
import NutritionResultsTotals from '../Nutrition/NutritionResultsTotals';
import { connect } from 'react-redux';
import {
  addProtectedData,
  clearError,
} from '../../store/actions/protected-data';
import { clearSearchError } from '../../store/actions/search';
import requiresLogin from '../Login/RequiresLogin';
import Loading from '../Loading/Loading';
import NutritionResult from './NutritionResult';
import Header from '../Header/Header';
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

  const onAdd = useCallback((e, nutritionTotals, option) => {
    e.preventDefault();
    dispatch(addProtectedData(nutritionTotals, option));
    setAddSuccess(true);
  }, []);

  const nutritionList = useMemo(() => {
    return nutritionResults.map((result, index) => (
      <NutritionResult index={index} result={result} />
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
      <Header
        element={nutritionResultsElement}
        dispatch={dispatch}
        history={history}
        setLeaving={setLeaving}
        location="nutrition-results"
      />
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
