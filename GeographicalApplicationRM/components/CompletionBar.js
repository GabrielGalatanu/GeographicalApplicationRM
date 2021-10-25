import React from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';

export default function CompletionBar({count, answerArray}) {
  return (
    <View style={styles.barContainer}>
      {answerArray.slice(0, count).map((item, index) => {
        if (item === true && index < count) {
          return (
            <View
              key={index}
              style={[
                styles.bar,
                styles.barCorrect,
                {
                  width:
                    (Dimensions.get('window').width * 96) / count / 100 - 4,
                },
              ]}
            />
          );
        }

        if (item === false && index < count) {
          return (
            <View
              key={index}
              style={[
                styles.bar,
                styles.barIncorrect,
                {
                  width:
                    (Dimensions.get('window').width * 96) / count / 100 - 4,
                },
              ]}
            />
          );
        }

        if (item === null && index < count) {
          return (
            <View
              key={index}
              style={[
                styles.bar,
                styles.barEmpty,
                {
                  width:
                    (Dimensions.get('window').width * 96) / count / 100 - 4,
                },
              ]}
            />
          );
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  barContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    height: 4,
    marginLeft: 2,
    marginRight: 2,
  },
  barEmpty: {
    backgroundColor: 'gray',
  },
  barCorrect: {
    backgroundColor: '#32C671',
  },
  barIncorrect: {
    backgroundColor: 'red',
  },
});
