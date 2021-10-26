import {getAllRegionsAPI} from 'http/restcountries';

import AsyncStorage from '@react-native-async-storage/async-storage';

const statisticsStorageName = 'Statistics';

export const getStatisticsDataService = async () => {
  try {
    let regionsDTO = await getAllRegionsAPI();

    return regionsDTO.data;
  } catch (err) {
    console.log(err);
  }
};

/**
 *
 * @returns {Promise<(import('models/statistic').default[])>}
 */

export const loadGameStatisticsAsyncStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(statisticsStorageName);

    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    } else {
      return [];
    }
  } catch (e) {
    // error reading value
  }
};

/**
 *
 * @param {import('models/statistic').default} statistics
 */

export const saveGameStatisticsAsyncStorage = async statistics => {
  try {
    let data = await loadGameStatisticsAsyncStorage();

    data.push(statistics);

    await AsyncStorage.setItem(statisticsStorageName, JSON.stringify(data));
  } catch (e) {
    // error reading value
  }
};
