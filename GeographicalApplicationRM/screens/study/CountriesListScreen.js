import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {getAllCountriesByRegionAPI} from 'http/restcountries';
import CountryButton from 'components/CountryButton';
import Themes from 'constants/Themes';
import 'types/index.js';

import {apiErrorHandler} from '../../error/apiErrorHandlers';

/**
 * @param {CountriesListScreenProps} props
 */

const CountriesListScreen = props => {
  const {route, navigation} = props;
  /**
   * @type {[CountryDTOData[], CountriesStateSetter]} Countries
   */
  const [countries, setCountries] = useState([]);
  const [apiRequestPromiseType, setApiRequestPromiseType] =
    useState('_LOADING');

  /**
   * @type {[(import('react').ReactElement|string) ,React.Dispatch<React.SetStateAction<(import('react').ReactElement|string)>>]}.
   */
  const [apiErrorHandlerJSX, setApiErrorHandlerJSX] = useState();

  const fetchDataFromAPI = useCallback(async () => {
    let countriesData = await getAllCountriesByRegionAPI(route.params.region);

    setApiRequestPromiseType(countriesData.data.promiseType);
    if (countriesData.data.promiseType === 'CountryDTO') {
      setCountries(countriesData.data.json);
    }
  }, [route.params.region]);

  useEffect(() => {
    fetchDataFromAPI();
  }, [fetchDataFromAPI]);

  const reloadButtonHandler = useCallback(() => {
    setApiRequestPromiseType('_LOADING');
    fetchDataFromAPI();
  }, [fetchDataFromAPI]);

  useEffect(() => {
    setApiErrorHandlerJSX(
      apiErrorHandler(apiRequestPromiseType, reloadButtonHandler),
    );
  }, [apiRequestPromiseType, reloadButtonHandler]);

  const navigateToCountryDetailScreen = country => {
    navigation.navigate('CountryDetailScreen', {country: country});
  };

  const createMainJSXFragment = () => {
    return (
      <>
        <FlatList
          data={countries}
          renderItem={({item}) => {
            return (
              <CountryButton
                alpha2Code={item.alpha2Code}
                country={item.name}
                onPress={navigateToCountryDetailScreen}
              />
            );
          }}
          keyExtractor={item => item.name}
        />
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
      {apiErrorHandlerJSX === 'create_main_content'
        ? createMainJSXFragment()
        : apiErrorHandlerJSX}
    </LinearGradient>
  );
};

export const screenOptions = () => {
  return {
    headerTitle: 'Countries List!',
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

export default CountriesListScreen;
