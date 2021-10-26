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

export default function StatisticsCellQuestionVariant(props) {
  const [borderColour, setBorderColor] = useState(
    Themes.colors.quizButtonNotSelected,
  );
  const [ok, setOk] = useState(null);

  useEffect(() => {
    if (
      props.question.correctAnswerID ===
      props.question.variantsArray[props.index].id
    ) {
      setBorderColor(Themes.colors.quizButtonSelected);
      setOk(true);
    }

    if (
      props.question.selectedAnswerID ===
      props.question.variantsArray[props.index].id
    ) {
      if (props.question.selectedAnswerID !== 0) {
        setBorderColor(Themes.colors.quizButtonIncorrect);
        setOk(false);
      }
    }
  }, [props]);

  const createOkCheck = () => {
    return (
      <View style={styles.rightSide}>
        {ok === null && <View style={styles.okCircle}></View>}
        {ok === true && (
          <Image
            style={styles.check}
            resizeMode={'cover'}
            source={require('../assets/ok.png')}
          />
        )}
        {ok === false && (
          <Image
            style={styles.check}
            resizeMode={'cover'}
            source={require('../assets/wrong.png')}
          />
        )}
      </View>
    );
  };

  if (props.type === 'Capital' || props.type === 'Neighbour') {
    return (
      <TouchableOpacity>
        <View style={[styles.button, {borderColor: borderColour}]}>
          <View style={styles.leftSide}>
            <Text style={styles.buttonText}>
              {props.question.variantsArray[props.index].variant}
            </Text>
          </View>

          {createOkCheck()}
        </View>
      </TouchableOpacity>
    );
  } else if (props.type === 'Flag') {
    return (
      <TouchableOpacity>
        <View style={[styles.buttonFlag, {borderColor: borderColour}]}>
          <Image
            style={styles.flag}
            resizeMode={'cover'}
            source={{
              uri: `http://localhost:3000/countryFlags/${
                props.question.variantsArray[props.index].variant
              }.png`,
            }}
          />

          {createOkCheck()}
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
    width: (Dimensions.get('window').width * 80) / 100,
    backgroundColor: Themes.colors.quizButtonBackground,
    marginBottom: 10,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonFlag: {
    borderRadius: 15,
    borderWidth: 3,
    borderColor: Themes.colors.quizButtonNotSelected,
    paddingVertical: 12,
    paddingHorizontal: 6,
    width: (Dimensions.get('window').width * 35) / 100,
    backgroundColor: Themes.colors.quizButtonBackground,
    marginBottom: 10,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonText: {
    marginLeft: 20,
    color: 'white',
    fontSize: 15,
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
  leftSide: {width: (Dimensions.get('window').width * 60) / 100},
  rightSide: {
    width: (Dimensions.get('window').width * 10) / 100,
    justifyContent: 'center',
  },
  leftSideFlag: {
    width: (Dimensions.get('window').width * 20) / 100,
  },
  flag: {
    width: (Dimensions.get('window').width * 12) / 100,
    height: (Dimensions.get('window').width * 8) / 100,
  },
});
