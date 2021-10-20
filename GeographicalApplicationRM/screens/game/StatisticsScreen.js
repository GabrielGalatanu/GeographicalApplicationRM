import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Themes from 'constants/Themes';
import 'types/index';

/**
 * @param {StatisticsScreenProps} props
 */

const StatisticsScreen = props => {
  return (
    <LinearGradient
      colors={[
        Themes.colors.twitchGradientStart,
        Themes.colors.twitchGradientEnd,
      ]}
      style={styles.screen}>
      <View style={styles.statisticsContainer}>
        <Text> No data!</Text>
      </View>

      <View style={styles.startButtonContainer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => {
            //setModalVisible(true);
            props.navigation.navigate('ModalGameConfiguration');
          }}>
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
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
  statisticsContainer: {
    width: '90%',
    height: '80%',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonContainer: {
    width: '90%',
    height: '15%',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    width: '30%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: Themes.borders.widthValue,
    borderRadius: Themes.borders.radiusValue,
    backgroundColor: Themes.colors.twitchGradientStart,
    borderColor: Themes.colors.twitchHeader,
  },
  startButtonText: {
    fontSize: 30,
    color: 'white',
    letterSpacing: 1,
    fontFamily: 'Yrsa-Bold',
  },
});

export default StatisticsScreen;
