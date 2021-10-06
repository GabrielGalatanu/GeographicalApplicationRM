import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';

const MenuButton = props => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={() => {
        props.onPress(props.label);
    }}>
      <Text style={styles.buttonText}> {props.label} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 30,
    fontFamily: 'Yrsa-Bold',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    width: '80%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.twitchHeader,
    borderRadius: 20,
    marginTop: '5%',
    marginBottom: '5%',
  },
});
export default MenuButton;
