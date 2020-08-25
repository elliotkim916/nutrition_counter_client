import React, { Component } from 'react';
import { clearAuth } from '../../store/actions/auth';
import { clearAuthToken } from '../../shared/local-storage';
import Search from '../Dashboard/Search';
import ExerciseResultsTotals from './exercise-results-totals';
import { connect } from 'react-redux';
import {
  addProtectedData,
  clearError,
} from '../../store/actions/protected-data';
import requiresLogin from '../Login/requires-login';
import { AddSuccess } from '../../shared/add';
import { clearSearchError } from '../../store/actions/search';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';
import '../../index.scss';

export class ExerciseResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaving: false,
      addSuccess: false,
    };

    this.onAdd = this.onAdd.bind(this);
  }

  logOut() {
    this.setState({ leaving: true });
    const exerciseSearchResults = this.refs.exerciseResultsSection;
    exerciseSearchResults.addEventListener('animationend', (e) => {
      if (e.animationName === 'opacity_out') {
        this.props.dispatch(clearAuth());
        clearAuthToken();
        this.props.history.push('/login-page');
      } else {
        return;
      }
    });
  }

  toDashboard() {
    this.setState({ leaving: true });
    const exerciseSearchResults = this.refs.exerciseResultsSection;
    exerciseSearchResults.addEventListener('animationend', (e) => {
      if (e.animationName === 'opacity_out') {
        this.props.history.push('/dashboard');
      } else {
        return;
      }
    });
  }

  onAdd(e, exerciseTotals, option) {
    e.preventDefault();
    this.props.dispatch(addProtectedData(exerciseTotals, option));
    this.setState({ addSuccess: true });
  }

  render() {
    let addSuccess, addError, loading, searchFail;
    if (this.state.addSuccess) {
      addSuccess = (
        <AddSuccess
          message="You have successfully saved your workout!"
          clearAddSuccess={() => this.setState({ addSuccess: false })}
        />
      );
    } else {
      addSuccess = null;
    }

    if (this.props.addError) {
      addError = (
        <Error
          errorMessage="Sorry, your workout was unable to be saved.."
          clearError={clearError}
        />
      );
    } else {
      addError = null;
    }

    if (this.props.loading) {
      loading = <Loading loadingMessage="Result is loading.." />;
    } else {
      loading = null;
    }

    if (this.props.exerciseError) {
      searchFail = (
        <Error
          errorMessage="Sorry, no results were found.."
          clearError={clearSearchError}
        />
      );
    } else {
      searchFail = null;
    }

    let exercise_result = this.props.exerciseResults.map((result, index) => (
      <li key={index} className="exercise-list-item">
        <h3 className="exercise-name">
          {result.name
            .toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')}
        </h3>
        <p className="calories-burned">
          <span>Estimated Calories Burned :</span>{' '}
          {Math.floor(result.nf_calories)}
        </p>
        <p className="MET">
          <span>MET :</span> {result.met}
        </p>
        <p className="exercise-duration">
          <span>Duration :</span> {result.duration_min} min
        </p>
      </li>
    ));

    return (
      <section
        className={`exercise-results-section ${
          this.state.leaving ? 'opacity-out' : ''
        }`}
        ref="exerciseResultsSection"
      >
        <div className="shape">
          <span
            onClick={() => this.toDashboard()}
            tabIndex="1"
            className="go-home-btn"
          >
            Home
          </span>
          <span
            onClick={() => this.logOut()}
            tabIndex="2"
            className="logout-btn"
          >
            Log Out
          </span>
          <br />
          <h1 className="title-header">Nutrition Counter</h1>
          <Search location="exercise-results" />
        </div>

        <ul
          className={
            !this.props.loading ? 'exercise-results fadeIn' : 'exercise-results'
          }
        >
          {exercise_result}
        </ul>
        <ExerciseResultsTotals onAdd={this.onAdd} />

        {addSuccess}
        {addError}
        {loading}
        {searchFail}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.searchReducer.loading,
  exerciseError: state.searchReducer.error,
  exerciseResults: state.searchReducer.exercise,
  username: state.authReducer.currentUser.username,
  addError: state.protected.error,
});

export default requiresLogin()(connect(mapStateToProps)(ExerciseResults));
