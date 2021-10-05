import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import {Button, StyleSheet, Text, View} from 'react-native';

const RegionListScreen = props => {

  return (
    <View style={styles.container}>
      <Text> RegionListScreen </Text>
      <Button title="Go to Country List" onPress={() => {
        props.navigation.navigate('CountriesListScreen');
      }}/>
    </View>
  );
};

export const screenOptions = () => {
    return {
      headerTitle: 'Regions!',
    };
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegionListScreen;
