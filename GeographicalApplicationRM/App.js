import React from 'react';

import {StyleSheet, Text, View} from 'react-native';


import { GeographicalTabNavigator } from './navigation/GeographicalNavigator';
import {NavigationContainer} from '@react-navigation/native';


const App = () => {
  return (
    <NavigationContainer>

      <GeographicalTabNavigator/>

    </NavigationContainer>
  );
};
{/* <View style={styles.container}>

<Text>Abecedar</Text>
</View> */}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
