import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import * as RNLocalize from 'react-native-localize';

import DetailsSection from 'components/DetailsSection';
import TimezonesSection from 'components/TimezonesSection';
import NeighboursSection from 'components/NeighboursSection';
import Themes from 'constants/Themes';

import 'types/index';

import {apiErrorHandler} from '../../error/apiErrorHandlers';

import {getCountryDetailsDataService} from 'services/CountryDetailsScreenService';

const CountryDetailsScreen = props => {
  const {route} = props;
  /**
   * @type {[CountryData, CountryDataStateSetter]}
   */
  const [countryData, setCountryData] = useState();

  const [apiRequestPromiseType, setApiRequestPromiseType] =
    useState('_LOADING');

  /**
   * @type {[(import('react').ReactElement|string) ,React.Dispatch<React.SetStateAction<(import('react').ReactElement|string)>>]}.
   */
  const [apiErrorHandlerJSX, setApiErrorHandlerJSX] = useState();

  //Time counter:
  const timeCounter = useCallback(() => {
    if (countryData !== undefined) {
      setCountryData({
        ...countryData,
        timezones: countryData.country.getLocalTime(),
      });
    }
  }, [countryData]);

  useEffect(() => {
    let countryTimeIntervalCounter = setInterval(() => timeCounter(), 1000);

    return () => {
      clearInterval(countryTimeIntervalCounter);
    };
  }, [countryData, timeCounter]);
  //Time counter//

  const fetchDataFromAPI = useCallback(() => {
    const getData = async () => {
      try {
        let data = await getCountryDetailsDataService(route.params.country);

        setApiRequestPromiseType(data.promiseType);
        setCountryData({
          country: data.country,
          neighbours: data.neighbours,
          timezones: data.country.getLocalTime(),
          currencyValue: data.country.getCurrenciesValueComparison(
            data.currencyValue,
            RNLocalize.getCurrencies()[0],
            data.country.currency,
          ),
        });
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [route.params.country]);

  useEffect(() => {
    fetchDataFromAPI();
  }, [fetchDataFromAPI]);

  const reloadButtonHandler = useCallback(() => {
    setApiRequestPromiseType('_LOADING');
    fetchDataFromAPI();
  }, [fetchDataFromAPI]);

  const navigateToNeighbour = neighbour => {
    props.navigation.push('CountryDetailScreen', {country: neighbour});
  };

  useEffect(() => {
    setApiErrorHandlerJSX(
      apiErrorHandler(apiRequestPromiseType, reloadButtonHandler),
    );
  }, [apiRequestPromiseType, reloadButtonHandler]);

  const createMainJSXFragment = () => {
    return (
      <>
        <ScrollView>
          {/* <Button title="test" onPress={() => test()} /> */}
          <View style={styles.screen}>
            <View style={styles.flagContainer}>
              <Image
                style={styles.flag}
                resizeMode={'cover'}
                source={{
                  uri: countryData.country.flagURL,
                }}
              />
            </View>

            <View style={styles.countryNameContainer}>
              <Text style={styles.countryNameText}>
                {countryData.country.name}({countryData.country.alpha2Code})
              </Text>
            </View>

            <DetailsSection
              country={countryData.country}
              currenciesValues={countryData.currencyValue}
            />

            <TimezonesSection localTime={countryData.timezones} />

            <NeighboursSection
              neighbours={countryData.neighbours}
              onPress={navigateToNeighbour}
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
      {apiErrorHandlerJSX === 'create_main_content'
        ? createMainJSXFragment()
        : apiErrorHandlerJSX}
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
    width: '100%',
    height: '100%',
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
  countryNameContainer: {
    marginTop: 5,
    width: (Dimensions.get('window').width * 90) / 100,
    height: (Dimensions.get('window').width * 10) / 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryNameText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    fontFamily: 'Yrsa-Bold',
  },
});

export default CountryDetailsScreen;
