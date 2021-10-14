import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Themes from 'constants/Themes';
import MenuButton from 'components/MenuButton';
import {getAllRegionsAPI} from 'http/restcountries';

import 'types/index';

import {apiErrorHandler} from '../../error/apiErrorHandlers';

/**
 *
 * @param {RegionListScreenProps} props
 */

const RegionListScreen = props => {
  const [regionArray, setRegionArray] = useState([]);
  const [apiRequestPromiseType, setApiRequestPromiseType] =
    useState('_LOADING');

  const fetchDataFromAPI = useCallback(async () => {
    let response = await getAllRegionsAPI();

    setApiRequestPromiseType(response.data.promiseType);
    setRegionArray(response.data.json);
  }, []);

  useEffect(() => {
    fetchDataFromAPI();
  }, [fetchDataFromAPI]);

  const reloadButtonHandler = () => {
    setApiRequestPromiseType('_LOADING');
    fetchDataFromAPI();
  };

  const navigateToCountriesListScreen = region => {
    props.navigation.navigate('CountriesListScreen', {region: region});
  };

  const createMainJSXFragment = () => {
    return (
      <>
        {regionArray.map(region => {
          return (
            <MenuButton
              key={region}
              buttonCount={regionArray.length}
              label={region}
              onPress={() => navigateToCountriesListScreen(region)}
            />
          );
        })}
      </>
    );
  };

  return (
    <LinearGradient
      colors={[
        Themes.colors.twitchGradientStart,
        Themes.colors.twitchGradientEnd,
      ]}
      style={styles.screen}>
      {apiErrorHandler(apiRequestPromiseType, reloadButtonHandler) ===
      'create_main_content'
        ? createMainJSXFragment()
        : apiErrorHandler(apiRequestPromiseType, reloadButtonHandler)}
    </LinearGradient>
  );
};

export const screenOptions = () => {
  return {
    headerTitle: 'Regions!',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 25,
    color: 'white',
    letterSpacing: 1,
    fontFamily: 'Yrsa-Bold',
  },
  errorButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Themes.colors.twitchBottom,
    height: 40,
    width: '25%',
    borderRadius: 10,
    marginTop: 10,
  },
  errorButtonText: {
    fontSize: 20,
    color: 'white',
    letterSpacing: 1,
    fontFamily: 'Yrsa-Bold',
  },
});

export default RegionListScreen;
