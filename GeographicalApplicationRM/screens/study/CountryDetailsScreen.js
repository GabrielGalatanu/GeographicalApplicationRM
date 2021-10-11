import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {getCountryAPI} from 'http/restcountries';
import Themes from 'constants/Themes';
import Country from 'models/country';
import 'types/index';

const CountryDetailsScreen = props => {
  const {route} = props;
  /**
   * @type {[Country, CountriesStateSetter]} Country
   */
  const [country, setCountry] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchDataFromAPI = useCallback(() => {
    (async () => {
      setIsLoading(true);

      const response = await getCountryAPI(
        route.params.country,
        dataFailedToLoad,
      );

      const CountryInfo = new Country(
        response[0].name,
        response[0].alpha2Code,
        response[0].flags.png,
        response[0].capital,
        response[0].population,
        response[0].area,
        response[0].currencies[0].code,
      );

      setCountry(CountryInfo);

      setIsLoading(false);
    })();
  }, [route.params.country]);

  useEffect(() => {
    fetchDataFromAPI();
  }, [fetchDataFromAPI]);

  const dataFailedToLoad = () => {
    setIsError(true);
  };

  const reloadButtonHandler = () => {
    setIsError(false);
    fetchDataFromAPI();
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
        <ScrollView>
          <View style={styles.flagContainer}>
            <Image
              style={styles.flag}
              resizeMode={'cover'}
              source={{
                uri: country.flagURL,
              }}
            />
          </View>
        </ScrollView>
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
    headerTitle: 'Country Details!',
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
  flagContainer: {
    marginTop: 5,
    width: (Dimensions.get('window').width * 80) / 100,
    height: (Dimensions.get('window').width * 50) / 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flag: {
    width: (Dimensions.get('window').width * 60) / 100,
    height: (Dimensions.get('window').width * 40) / 100,
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

export default CountryDetailsScreen;
