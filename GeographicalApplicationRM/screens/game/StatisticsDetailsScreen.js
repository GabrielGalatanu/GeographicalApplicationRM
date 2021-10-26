import React from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Themes from 'constants/Themes';

import StatisticsCellQuestionView from 'components/StatisticsDetailsQuestionView';

const StatisticsDetailsScreen = props => {
  if (props.route.params.data !== undefined) {
    return (
      <LinearGradient
        colors={[
          Themes.colors.twitchGradientStart,
          Themes.colors.twitchGradientEnd,
        ]}
        style={styles.screen}>
        <ScrollView>
          {props.route.params.data.questions.map((question, index) => {
            return (
              <StatisticsCellQuestionView
                question={question}
                type={props.route.params.data.type}
                index={index}
              />
            );
          })}
        </ScrollView>
      </LinearGradient>
    );
  } else {
    return <Text>abc</Text>;
  }
};

export const screenOptions = () => {
  return {
    headerTitle: 'Statistics',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: Themes.colors.twitchHeader,
    },
    headerTitleStyle: {
      fontFamily: 'Yrsa-Bold',
      fontSize: 25,
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default StatisticsDetailsScreen;
