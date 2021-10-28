export const SAVE_STATISTICS = 'SAVE_STATISTICS';
export const LOAD_STATISTICS = 'LOAD_STATISTICS';

import AsyncStorage from '@react-native-async-storage/async-storage';

const statisticsStorageName = 'Statistics';

export const loadStatistics = () => {
  return async dispatch => {
    try {
      const jsonValue = await AsyncStorage.getItem(statisticsStorageName);

      let statistics = [];
      if (jsonValue !== null) {
        statistics = JSON.parse(jsonValue);
      }

      dispatch({type: LOAD_STATISTICS, statistics: statistics});
    } catch (err) {
      throw err;
    }
  };
};

export const saveStatistics = statistic => {
  return async dispatch => {
    try {
      const jsonValue = await AsyncStorage.getItem(statisticsStorageName);

      let statistics = [];
      if (jsonValue !== null) {
        statistics = JSON.parse(jsonValue);
      }

      statistics.push(statistic);

      await AsyncStorage.setItem(
        statisticsStorageName,
        JSON.stringify(statistics),
      );
      dispatch({type: SAVE_STATISTICS, statistics: statistics});
    } catch (err) {
      throw err;
    }
  };
};
