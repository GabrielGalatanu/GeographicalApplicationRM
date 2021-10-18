import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const GameConfigurationButton = props => {
  return (
    <View style={styles.container}>
      <Text>{props.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '30%',
    height: '90%',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 3,
    borderColor: 'green',
  },
});

export default GameConfigurationButton;
