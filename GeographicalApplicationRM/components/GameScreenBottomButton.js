import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const GameScreenBottomButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={[
          styles.nextButton,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor: props.available ? '#06CFF2' : '#555D7A',
          },
        ]}>
        <Text style={styles.nextButtonText}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  nextButton: {
    borderRadius: 15,
    marginLeft: 5,
    marginRight: 5,
    width: (Dimensions.get('window').width * 20) / 100,
    height: (Dimensions.get('window').width * 10) / 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Yrsa-Bold',
  },
});

export default GameScreenBottomButton;
