import React from 'react';

import {Button,StyleSheet, Text, View} from 'react-native';

const CountriesListScreen = props => {
  return (
    <View style={styles.container}>
      <Text> CountriesListScreen </Text>
      <Button title="Go to Country Detail Screen" onPress={() => {
        props.navigation.navigate('CountryDetailScreen');
      }}/>
    </View>
  );
};

export const screenOptions = () => {
    return {
      headerTitle: 'Countries List!',
    };
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CountriesListScreen;
