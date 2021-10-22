import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

import QuizButton from 'components/QuizButton';
import QuizButtonFlag from 'components/QuizButtonFlag';

const QuizButtonsComponent = props => {
  if (props.gameType === 'Capital') {
    return (
      <View style={styles.answerOptionsContainer}>
        {props.variantsArray.map((variant, variantIndex) => {
          return (
            <QuizButton
              key={variantIndex}
              index={variantIndex}
              text={variant.variant}
              selected={props.selectedVariant}
              onPress={index => props.variantButtonPressed(index)}
            />
          );
        })}
      </View>
    );
  }

  if (props.gameType === 'Flag') {
    return (
      <View style={styles.answerOptionsContainerFlag}>
        {props.variantsArray.map((variant, variantIndex) => {
          return (
            <QuizButtonFlag
              key={variantIndex}
              index={variantIndex}
              alpha2Code={variant.variant}
              selected={props.selectedVariant}
              onPress={index => props.variantButtonPressed(index)}
            />
          );
        })}
      </View>
    );
  }
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
