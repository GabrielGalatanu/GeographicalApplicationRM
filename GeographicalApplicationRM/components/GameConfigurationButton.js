import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Themes from 'constants/Themes';
const GameConfigurationButton = props => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        props.selected === 1 ? styles.buttonSelected : styles.buttonNotSelected,
      ]}
      onPress={() => props.onPress(props.index)}>
      <Text style={styles.text}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '30%',
    height: '90%',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: Themes.colors.twitchGradientEnd,
  },
  buttonNotSelected: {
    borderColor: 'gray',
  },
  buttonSelected: {
    borderColor: 'green',
  },
  text: {
    fontSize: 20,
    color: 'white',
    letterSpacing: 1,
    fontFamily: 'Yrsa-Bold',
  },
});

export default GameConfigurationButton;
