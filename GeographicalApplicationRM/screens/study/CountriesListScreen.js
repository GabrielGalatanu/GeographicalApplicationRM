import React, {useEffect, useState} from 'react';
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
import Colors from 'constants/Colors';
import 'types/index.js';

/**
 * @param {CountriesListScreenProps} props
 */

const CountriesListScreen = props => {
  /**
   * @type {[CountryArrayAPI[], CountriesStateSetter]} Loading
   */
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = () => {
    (async () => {
      setIsLoading(true);
      setCountries(
        await getAllCountriesByRegionAPI(
          props.route.params.region,
          dataFailedToLoad,
        ),
      );
      setIsLoading(false);
    })();
  };

  const dataFailedToLoad = () => {
    setIsError(true);
  };

  const reloadButtonHandler = () => {
    setIsError(false);
    fetchDataFromAPI();
  };

  const navigateToCountryDetailScreen = country => {
    props.navigation.navigate('CountryDetailScreen', {country: country});
  };

  if (isError) {
    return (
      <LinearGradient
        colors={[Colors.twitchGradientStart, Colors.twitchGradientEnd]}
        style={styles.screen}>
        <Text style={styles.errorText}>Data failed to load!</Text>
        <TouchableOpacity
          style={styles.errorButton}
          onPress={() => {
            reloadButtonHandler();
          }}>
          <Text style={styles.errorButtonText}>Reload?</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  if (isLoading) {
    return (
      <LinearGradient
        colors={[Colors.twitchGradientStart, Colors.twitchGradientEnd]}
        style={styles.screen}>
        <ActivityIndicator size="large" color={Colors.twitchHeader} />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[Colors.twitchGradientStart, Colors.twitchGradientEnd]}
      style={styles.screen}>
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
    </LinearGradient>
  );
};

export const screenOptions = () => {
  return {
    headerTitle: 'Countries List!',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: Colors.twitchHeader,
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
    backgroundColor: Colors.twitchBottom,
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
