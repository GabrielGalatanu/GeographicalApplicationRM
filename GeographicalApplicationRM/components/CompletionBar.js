import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';

export default function CompletionBar({count, answerArray, onPress}) {
  return (
    <View style={styles.barContainer}>
      {answerArray.slice(0, count).map((item, index) => {
        if (item === true && index < count) {
          return (
            <TouchableOpacity
              style={styles.barTouchable}
              onPress={() => onPress(index)}>
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
            </TouchableOpacity>
          );
        }

        if (item === null && index < count) {
          return (
            <TouchableOpacity
              style={styles.barTouchable}
              onPress={() => onPress(index)}>
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
            </TouchableOpacity>
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
  barTouchable: {
    paddingTop: 20,
    paddingBottom: 20,
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
