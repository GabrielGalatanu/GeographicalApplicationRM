import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';

import Themes from 'constants/Themes';

export default function QuizButton({variant, onPress, selected, type}) {
  const [borderColour, setBorderColor] = useState(
    Themes.colors.quizButtonNotSelected,
  );

  const buttonPressed = () => {
    onPress();
  };

  useEffect(() => {
    if (selected) {
      setBorderColor(Themes.colors.quizButtonSelected);
    } else {
      setBorderColor(Themes.colors.quizButtonNotSelected);
    }
  }, [selected]);

  const createOkCircle = () => {
    return (
      <View style={styles.rightSide}>
        {selected === false && <View style={styles.okCircle} />}
        {selected === true && (
          <Image
            style={styles.check}
            resizeMode={'cover'}
            // @ts-ignore
            source={require('assets/ok.png')}
          />
        )}
      </View>
    );
  };

  if (type === 'Capital' || type === 'Neighbour') {
    return (
      <TouchableOpacity onPress={() => buttonPressed()}>
        <View style={[styles.button, {borderColor: borderColour}]}>
          <View style={styles.leftSide}>
            <Text style={styles.buttonText}>{variant}</Text>
          </View>

          {createOkCircle()}
        </View>
      </TouchableOpacity>
    );
  } else if (type === 'Flag') {
    return (
      <TouchableOpacity onPress={() => buttonPressed()}>
        <View style={[styles.buttonFlag, {borderColor: borderColour}]}>
          <View style={styles.leftSideFlag}>
            <Image
              style={styles.flag}
              resizeMode={'cover'}
              source={{
                //uri: 'https://www.countryflags.io/' + alpha2Code + '/flat/64.png',
                uri: `http://localhost:3000/countryFlags/${variant}.png`,
              }}
            />
          </View>

          {createOkCircle()}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    borderWidth: 3,
    borderColor: Themes.colors.quizButtonNotSelected,
    paddingVertical: 12,
    paddingHorizontal: 6,
    width: (Dimensions.get('window').width * 90) / 100,
    backgroundColor: '#171D37',
    marginBottom: 10,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonText: {
    marginLeft: 20,
    color: 'white',
    fontSize: 18,
    textAlign: 'left',
    fontFamily: 'Yrsa-Bold',
  },
  okCircle: {
    borderRadius: 200,
    borderWidth: 3,
    borderColor: Themes.colors.quizButtonNotSelected,
    marginRight: 10,
    width: (Dimensions.get('window').width * 6) / 100,
    height: (Dimensions.get('window').width * 6) / 100,
  },
  check: {
    marginRight: 10,
    width: (Dimensions.get('window').width * 6) / 100,
    height: (Dimensions.get('window').width * 6) / 100,
  },
  leftSide: {
    width: (Dimensions.get('window').width * 60) / 100,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightSide: {
    width: (Dimensions.get('window').width * 10) / 100,
    justifyContent: 'center',
  },
  leftSideFlag: {width: (Dimensions.get('window').width * 20) / 100},
  flag: {
    width: (Dimensions.get('window').width * 18) / 100,
    height: (Dimensions.get('window').width * 12) / 100,
  },
  buttonFlag: {
    borderRadius: 15,
    borderWidth: 3,
    borderColor: Themes.colors.quizButtonNotSelected,
    paddingVertical: 12,
    paddingHorizontal: 6,
    width: (Dimensions.get('window').width * 40) / 100,
    backgroundColor: Themes.colors.quizButtonBackground,
    marginBottom: 10,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
