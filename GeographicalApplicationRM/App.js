import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import {NavigationContainer} from '@react-navigation/native';

import {GeographicalTabNavigator} from './navigation/GeographicalNavigator';
import {MainStackNavigator} from './navigation/GeographicalNavigator';

import statisticsReducer from './store/reducers/statistics';
const rootReducer = combineReducers({
  statisticsRedux: statisticsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
