import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {GeographicalTabNavigator} from './navigation/GeographicalNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <GeographicalTabNavigator />
    </NavigationContainer>
  );
};

export default App;
