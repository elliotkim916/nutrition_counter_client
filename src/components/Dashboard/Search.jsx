import React, { useState, useEffect } from 'react';
import NutritionSearchPage from '../Nutrition/NutritionSearchPage';
import ExerciseSearchPage from '../Exercise/ExerciseSearchPage';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../../index.scss';

const Search = ({ location }) => {
  const [index, setTabIndex] = useState(0);

  useEffect(() => {
    if (location === 'exercise-results') {
      setTabIndex(1);
    } else {
      setTabIndex(0);
    }
  }, []);

  return (
    <React.Fragment>
      <div className="search-container">
        <NutritionSearchPage />
        <ExerciseSearchPage />
        <br />
      </div>

      <div className="search-tabs-container">
        <Tabs
          selectedIndex={index}
          onSelect={(index, lastIndex, event) => {
            if (event.nativeEvent.type === 'click' && index !== lastIndex) {
              setTabIndex(index);
            }
          }}
        >
          <TabList style={{ borderBottom: 'none' }}>
            <Tab>Nutrition Search</Tab>
            <Tab>Exercise Search</Tab>
          </TabList>

          <TabPanel>
            <div>
              <NutritionSearchPage />
            </div>
          </TabPanel>
          <TabPanel>
            <div>
              <ExerciseSearchPage />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </React.Fragment>
  );
};

export default Search;
