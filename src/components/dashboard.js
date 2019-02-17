import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {fetchProtectedData} from '../actions/protected-data';
import requiresLogin from './requires-login';
import SearchPage from './search-page';

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
  }

  logOut(e) {
    e.preventDefault();
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    let nutrition_array = this.props.protectedData;
    let nutrition_totals = '';
    if (nutrition_array) {
      nutrition_totals = nutrition_array.map((value, index) => {
        return (
          <li key={index} className="nutrition_total">
            <ul>
              <li>{value.calories}</li>
              <li>{value.fat}</li>
              <li>{value.carbs}</li>
              <li>{value.sugars}</li>
              <li>{value.protein}</li>
              <li>{value.sodium}</li>
            </ul>
          </li>
        );
      });
    }

    return (
      <div className="dashboard">
        <a 
          href = "/"
          className = "log-out"
          onClick = {(e) => this.logOut(e)}
        >
        Log Out
        </a>
        <h1>Welcome {this.props.username}</h1>
        {nutrition_totals}
        <SearchPage/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  protectedData: state.protected.protected_data,
  username: state.auth.currentUser.username
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));