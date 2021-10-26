import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

import StatisticsCellQuestionVariant from './StatisticsDetailsQuestionVariant';

export default function StatisticsCellQuestionView(props) {
  if (props.type === 'Capital' || props.type === 'Neighbour') {
    return (
      <View style={styles.container}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionContainerText}>
            {props.question.questionString}
          </Text>
        </View>

        <View style={styles.answerOptionsContainer}>
          <StatisticsCellQuestionVariant
            index={0}
            type={props.type}
            question={props.question}
          />
          <StatisticsCellQuestionVariant
            index={1}
            type={props.type}
            question={props.question}
          />
          <StatisticsCellQuestionVariant
            index={2}
            type={props.type}
            question={props.question}
          />
          <StatisticsCellQuestionVariant
            index={3}
            type={props.type}
            question={props.question}
          />
        </View>
      </View>
    );
  } else if (props.type === 'Flag') {
    return (
      <View style={styles.container}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionContainerText}>
            {props.question.questionString}
          </Text>
        </View>

        <View style={styles.answerOptionsContainerFlag}>
          <StatisticsCellQuestionVariant
            index={0}
            type={props.type}
            question={props.question}
          />
          <StatisticsCellQuestionVariant
            index={1}
            type={props.type}
            question={props.question}
          />
          <StatisticsCellQuestionVariant
            index={2}
            type={props.type}
            question={props.question}
          />
          <StatisticsCellQuestionVariant
            index={3}
            type={props.type}
            question={props.question}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: (Dimensions.get('window').width * 90) / 100,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#2A5C6B',
    backgroundColor: '#272B4A',
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  questionContainer: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 4,
    marginRight: 4,
    justifyContent: 'center',
  },
  questionContainerText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Yrsa-Bold',
    textAlign: 'center',
  },
  answerOptionsContainer: {
    marginHorizontal: 10,
  },
  answerOptionsContainerFlag: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});
