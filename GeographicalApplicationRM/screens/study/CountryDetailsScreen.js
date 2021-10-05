import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

const CountryDetailsScreen = props => {
  return (
    <View style={styles.container}>
      <Text> CountryDetailsScreen </Text>
      
    </View>
  );
};

export const screenOptions = () => {
    return {
      headerTitle: 'Country Details!',
    };
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CountryDetailsScreen;