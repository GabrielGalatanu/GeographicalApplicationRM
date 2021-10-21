import React, {useEffect} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';

export default function CompletionBar({count, answerArray}) {
  let keyCounter = -1;
  useEffect(() => {
    keyCounter = -1;
  }, []);

  useEffect(() => {
    keyCounter = -1;
  }, [answerArray]);

  return (
    <View style={styles.barContainer}>
      {answerArray.slice(0, count).map(item => {
        keyCounter++;

        if (item === 1 && keyCounter < count) {
          return (
            <View
              key={keyCounter}
              style={[
                styles.bar,
                styles.barCorrect,
                {
                  width:
                    (Dimensions.get('window').width * 96) / count / 100 - 4,
                },
              ]}>
              <Text>{''}</Text>
            </View>
          );
        }

        if (item === 0 && keyCounter < count) {
          return (
            <View
              key={keyCounter}
              style={[
                styles.bar,
                styles.barIncorrect,
                {
                  width:
                    (Dimensions.get('window').width * 96) / count / 100 - 4,
                },
              ]}>
              <Text>{''}</Text>
            </View>
          );
        }

        if (item === null && keyCounter < count) {
          return (
            <View
              key={keyCounter}
              style={[
                styles.bar,
                styles.barEmpty,
                {
                  width:
                    (Dimensions.get('window').width * 96) / count / 100 - 4,
                },
              ]}>
              <Text>{''}</Text>
            </View>
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
