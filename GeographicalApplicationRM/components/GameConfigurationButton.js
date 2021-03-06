import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

import Themes from 'constants/Themes';
const GameConfigurationButton = props => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        props.selected === props.label
          ? styles.buttonSelected
          : styles.buttonNotSelected,
        {width: `${(100 / props.count) * 0.9}%`},
      ]}
      onPress={() => props.onPress(props.index, props.id)}>
      <Text style={[styles.text, {fontSize: 35 - props.count * 5}]}>
        {props.label}
      </Text>
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
    fontSize: 15,
    color: 'white',
    letterSpacing: 1,
    fontFamily: 'Yrsa-Bold',
  },
});

export default GameConfigurationButton;
