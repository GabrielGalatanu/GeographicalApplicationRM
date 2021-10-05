import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import {Button, StyleSheet, Text, View} from 'react-native';

// Import vector icons
import Icon from 'react-native-vector-icons/Ionicons';

const RegionListScreen = props => {

  return (
    <View style={styles.container}>
      <Text> RegionListScreen </Text>
      <Button title="Go to Country List" onPress={() => {
        props.navigation.navigate('CountriesListScreen');
      }}/>
       <Icon name="game-controller" size={30} color="#900" />
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
