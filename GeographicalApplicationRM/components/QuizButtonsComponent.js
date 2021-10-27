import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

import QuizButton from 'components/QuizButton';

const QuizButtonsComponent = props => {
  return (
    <View
      style={
        props.gameType === 'Capital' || props.gameType === 'Neighbour'
          ? styles.answerOptionsContainer
          : styles.answerOptionsContainerFlag
      }>
      {props.variantsArray.map((variant, variantIndex) => {
        return (
          <QuizButton
            key={variantIndex}
            variant={variant.variant}
            selected={
              props.selectedVariantsArray[props.questionNumber] === variantIndex
                ? true
                : false
            }
            onPress={() => props.variantButtonPressed(variantIndex)}
            type={props.gameType}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  answerOptionsContainer: {
    marginTop: 30,
    height: (Dimensions.get('window').width * 60) / 100,
    marginHorizontal: 10,
  },
  answerOptionsContainerFlag: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (Dimensions.get('window').height * 10) / 100,
    height: (Dimensions.get('window').width * 60) / 100,
    marginHorizontal: 10,
  },
});

export default QuizButtonsComponent;
