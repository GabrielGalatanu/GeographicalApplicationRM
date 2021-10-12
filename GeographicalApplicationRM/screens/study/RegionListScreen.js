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

/**
 *
 * @param {RegionListScreenProps} props
 */

const RegionListScreen = props => {
  const [regionArray, setRegionArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchDataFromAPI = useCallback(async () => {
    setIsLoading(true);

    let response = await getAllRegionsAPI();
    console.log(response.data);
    if (fetchDataFromAPIErrorCheck(response)) {
      dataFailedToLoad();
    } else {
      if (response.data.promiseType === 'RegionDTO') {
        setRegionArray(response.data.json);
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchDataFromAPI();
  }, [fetchDataFromAPI]);

  /**
   * @param {RegionFetchFailed|RegionDTO|RegionFetchError} regionData
   */
  const fetchDataFromAPIErrorCheck = regionData => {
    let ifError = false;

    switch (regionData.data.promiseType) {
      case 'RegionFetchError':
        ifError = true;
        break;
      case 'RegionFetchFailed':
        ifError = true;
        break;
      default:
        ifError = false;
        break;
    }

    return ifError;
  };

  const dataFailedToLoad = () => {
    setIsLoading(false);
    setIsError(true);
  };

  const reloadButtonHandler = () => {
    setIsError(false);
    fetchDataFromAPI();
  };

  const navigateToCountriesListScreen = region => {
    props.navigation.navigate('CountriesListScreen', {region: region});
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
      {isError && isErrorJSXFragment()}
      {isLoading && !isError && isLoadingJSXFragment()}
      {!isLoading && !isError && mainJSXFragment()}
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
