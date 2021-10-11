import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, TouchableOpacity, Button} from 'react-native';

import Colors from 'constants/Colors';

const MenuButton = props => {
  const [buttonHeight, setButtonHeight] = useState('10%');

  useEffect(() => {
    let value = 50 / props.buttonCount;
    setButtonHeight(`${value}%`);
  }, [props]);

  return (
    <TouchableOpacity
      style={{...styles.buttonContainer, height: `${buttonHeight}`}}
      onPress={() => {
        props.onPress();
      }}>
      <Text style={styles.buttonText}> {props.label} </Text>
    </TouchableOpacity>
  );
};

//const buttonHeight = 10 / buttonCount;

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 30,
    fontFamily: 'Yrsa-Bold',
    textAlign: 'center',
    margin: 5,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    width: '80%',
    //height: '10%ß',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.twitchHeader,
    borderRadius: 20,
    marginTop: '4%',
    marginBottom: '4%',
  },
});
export default MenuButton;
