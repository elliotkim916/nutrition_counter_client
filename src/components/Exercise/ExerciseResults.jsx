import React, { useState, useRef, useCallback, useMemo, Suspense } from 'react';
import ExerciseResultsTotals from './ExerciseResultsTotals';
import { connect } from 'react-redux';
import {
  addProtectedData,
  clearError,
} from '../../store/actions/protected-data';
import requiresLogin from '../Login/requires-login';
import { clearSearchError } from '../../store/actions/search';
import Loading from '../Loading/Loading';
import Header from '../Header/Header';
import ExerciseResult from './ExerciseResult';
import '../../index.scss';

const AddSuccessCmp = React.lazy(() => import('../../shared/add'));
const AddErrorCmp = React.lazy(() => import('../Error/Error'));
const SearchErrorCmp = React.lazy(() => import('../Error/Error'));

const ExerciseResults = ({
  dispatch,
  history,
  loading,
  exerciseError,
  addError,
  exerciseResults,
}) => {
  const [leaving, setLeaving] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const exerciseResultsElement = useRef();

  const onAdd = useCallback((e, exerciseTotals, option) => {
    e.preventDefault();
    dispatch(addProtectedData(exerciseTotals, option));
    setAddSuccess(true);
  }, []);

  let addSuccessful, isError, isLoading, searchFail;
  if (addSuccess) {
    addSuccessful = (
      <Suspense fallback={<Loading loadingMessage="Result is loading.." />}>
        <AddSuccessCmp
          message="You have successfully saved your workout!"
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
          errorMessage="Sorry, your workout was unable to be saved.."
          clearError={clearError}
        />
      </Suspense>
    );
  } else {
    isError = null;
  }

  if (loading) {
    isLoading = <Loading loadingMessage="Result is loading.." />;
  } else {
    isLoading = null;
  }

  if (exerciseError) {
    searchFail = (
      <Suspense fallback={<Loading loadingMessage="Result is loading.." />}>
        <SearchErrorCmp
          errorMessage="Sorry, no results were found.."
          clearError={clearSearchError}
        />
      </Suspense>
    );
  } else {
    searchFail = null;
  }

  const exerciseList = useMemo(() => {
    return exerciseResults.map((result, index) => (
      <ExerciseResult index={index} result={result} />
    ));
  }, [exerciseResults]);

  return (
    <section
      className={`exercise-results-section ${leaving ? 'opacity-out' : ''}`}
      ref={exerciseResultsElement}
    >
      <Header
        element={exerciseResultsElement}
        dispatch={dispatch}
        history={history}
        setLeaving={setLeaving}
        location="exercise-results"
      />
      <ul
        className={
          !loading && exerciseError === null
            ? 'exercise-results fadeIn'
            : 'exercise-results'
        }
      >
        {exerciseList}
      </ul>
      <ExerciseResultsTotals onAdd={onAdd} exerciseError={exerciseError} />

      {addSuccessful}
      {isError}
      {isLoading}
      {searchFail}
    </section>
  );
};

const mapStateToProps = (state) => ({
  loading: state.searchReducer.loading,
  exerciseError: state.searchReducer.error,
  exerciseResults: state.searchReducer.exercise,
  username: state.authReducer.currentUser.username,
  addError: state.protected.error,
});

export default requiresLogin()(connect(mapStateToProps)(ExerciseResults));
