import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {GeographicalTabNavigator} from './navigation/GeographicalNavigator';
import {MainStackNavigator} from './navigation/GeographicalNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default App;
