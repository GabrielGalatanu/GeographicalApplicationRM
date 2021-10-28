import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';

import StatisticsButton from 'components/StatisticsButton';
import Themes from 'constants/Themes';
import 'types/index';

import {loadGameStatisticsAsyncStorage} from 'services/StatisticsScreenServices';

import * as statisticsActions from '../../store/actions/statistics';

/**
 * @param {StatisticsScreenProps} props
 */

const StatisticsScreen = props => {
  const [statistics, setStatistics] = useState([]);

  const statisticsRedux = useSelector(
    state => state.statisticsRedux.statisticsRedux,
  );
  const dispatch = useDispatch();

  //Getting data using the service:

  // const getData = async () => {
  //   setStatistics(await loadGameStatisticsAsyncStorage());
  // };

  // const removeValue = async () => {
  //   try {
  //     await AsyncStorage.removeItem('Statistics');
  //   } catch (e) {
  //     // remove error
  //   }

  //   console.log('Done.');
  // };

  // useEffect(() => {
  //   // removeValue();

  //   getData();
  //   const willFocusSubscription = props.navigation.addListener('focus', () => {
  //     getData();
  //   });

  //   return willFocusSubscription;
  // }, [props.navigation]);

  //Getting data using the service;

  useEffect(() => {
    setStatistics(statisticsRedux);
  }, [statisticsRedux]);

  useEffect(() => {
    dispatch(statisticsActions.loadStatistics());
  }, [dispatch]);

  const navigateToStatisticsDetailsScreen = data => {
    props.navigation.navigate('StatisticsDetailsScreen', {data: data});
  };

  return (
    <LinearGradient
      colors={[
        Themes.colors.twitchGradientStart,
        Themes.colors.twitchGradientEnd,
      ]}
      style={styles.screen}>
      <FlatList
        data={statistics}
        renderItem={({item}) => (
          <StatisticsButton
            onPress={data => navigateToStatisticsDetailsScreen(data)}
            item={item}
          />
        )}
        keyExtractor={(item, index) => item.date}
      />

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
