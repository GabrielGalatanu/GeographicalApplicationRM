import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {getAllCountriesByRegionAPI} from 'http/restcountries';
import CountryButton from 'components/CountryButton';
import Themes from 'constants/Themes';
import 'types/index.js';

/**
 * @param {CountriesListScreenProps} props
 */

const CountriesListScreen = props => {
  const {route, navigation} = props;
  /**
   * @type {[CountryDTOData[], CountriesStateSetter]} Countries
   */
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchDataFromAPI = useCallback(async () => {
    setIsLoading(true);
    let countriesData = await getAllCountriesByRegionAPI(route.params.region);
    if (fetchDataFromAPIErrorCheck(countriesData)) {
      dataFailedToLoad();
    } else {
      if (countriesData.data.promiseType === 'CountryDTO') {
        setCountries(countriesData.data.json);
        setIsLoading(false);
      }
    }
  }, [route.params.region]);

  /**
   * @param {CountryFetchFailed|CountryDTO|CountryFetchError} countriesData
   */
  const fetchDataFromAPIErrorCheck = countriesData => {
    let ifError = false;

    switch (countriesData.data.promiseType) {
      case 'CountryFetchError':
        if (countriesData.data.json.message === 'Network request failed') {
          ifError = true;
        }
        break;
      case 'CountryFetchFailed':
        if (countriesData.data.json.status === 404) {
          ifError = true;
        }
        break;
      default:
        ifError = false;
        break;
    }

    return ifError;
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, [fetchDataFromAPI]);

  const dataFailedToLoad = () => {
    setIsLoading(false);
    setIsError(true);
  };

  const reloadButtonHandler = () => {
    setIsError(false);
    fetchDataFromAPI();
  };

  const navigateToCountryDetailScreen = country => {
    navigation.navigate('CountryDetailScreen', {country: country});
  };

  const isErrorJSXFragment = () => {
    return (
      <>
        <Text style={styles.errorText}>Data failed to load!</Text>
        <TouchableOpacity
          style={styles.errorButton}
          onPress={() => {
            reloadButtonHandler();
          }}>
          <Text style={styles.errorButtonText}>Reload?</Text>
        </TouchableOpacity>
      </>
    );
  };

  const isLoadingJSXFragment = () => {
    return (
      <>
        <ActivityIndicator size="large" color={Themes.colors.twitchHeader} />
      </>
    );
  };

  const mainJSXFragment = () => {
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
      {isError && isErrorJSXFragment()}
      {isLoading && !isError && isLoadingJSXFragment()}
      {!isLoading && !isError && mainJSXFragment()}
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
