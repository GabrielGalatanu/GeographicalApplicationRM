import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

const StatisticsScreen = () => {
  return (
    <View style={styles.container}>
      <Text> StatisticsScreen </Text>
    </View>
  );
};

export const screenOptions = () => {
  return {
    headerTitle: 'Statistics!',
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StatisticsScreen;
