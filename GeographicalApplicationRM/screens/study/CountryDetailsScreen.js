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
import * as RNLocalize from 'react-native-localize';

import CountryButton from 'components/CountryButton'
import Themes from 'constants/Themes';
import Country from 'models/country';
import 'types/index';

import {getCountryDetailsDataService} from 'services/CountryDetailsScreenService';

const CountryDetailsScreen = props => {
  const {route} = props;
  /**
   * @type {[Country, CountryStateSetter]} Country
   */
  const [country, setCountry] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [localTime, setLocalTime] = useState('');
  const [currenciesValues, setCurrenciesValues] = useState('');
  const [neighbours, setNeighbours] = useState([]);

  //Time counter:

  const timeCounter = useCallback(() => {
    if (country !== undefined) {
      setLocalTime(country.getLocalTime());
    }
  }, [country]);

  useEffect(() => {
    let countryTimeIntervalCounter = setInterval(() => timeCounter(), 1000);

    return () => {
      clearInterval(countryTimeIntervalCounter);
    };
  }, [country, timeCounter]);

  //Time counter//

  const fetchDataFromAPI = useCallback(() => {
    const getData = async () => {
      try {
        setIsLoading(true);

        let data = await getCountryDetailsDataService(route.params.country);

        setCountry(data.country);
        setNeighbours(data.neighbours);
        setLocalTime(data.country.getLocalTime());
        setCurrenciesValues(
          data.country.getCurrenciesValueComparison(
            data.currencyValue,
            RNLocalize.getCurrencies()[0],
            data.country.currency,
          ),
        );

        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [route.params.country]);

  useEffect(() => {
    fetchDataFromAPI();
  }, [fetchDataFromAPI]);

  // Sa generalizez:
  const dataFailedToLoad = () => {
    setIsError(true);
  };

  const reloadButtonHandler = () => {
    setIsError(false);
    fetchDataFromAPI();
  };

  const navigateToNeighbour = neighbour => {
    props.navigation.push('CountryDetailScreen', {country: neighbour});
  };

  // Sa generalizez//

  ////////////////////
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
          <View style={styles.screen}>
            <View style={styles.flagContainer}>
              <Image
                style={styles.flag}
                resizeMode={'cover'}
                source={{
                  uri: country.flagURL,
                }}
              />
            </View>

            <View style={styles.countryNameContainer}>
              <Text style={styles.countryNameText}>
                {country.name}({country.alpha2Code})
              </Text>
            </View>

            <View style={styles.detailsLineContainer}>
              <View style={styles.detailsLine} />
              <View>
                <Text style={styles.detailsLineText}>Details</Text>
              </View>
              <View style={styles.detailsLine} />
            </View>

            <View style={styles.detailsContainer}>
              <Text style={styles.countryNameText}>
                Capital: {country.capital}
              </Text>

              <View style={styles.separationLineContainer}>
                <View style={styles.separationLine} />
              </View>

              <Text style={styles.countryNameText}>
                Population: {country.population}
              </Text>

              <View style={styles.separationLineContainer}>
                <View style={styles.separationLine} />
              </View>

              <Text style={styles.countryNameText}>
                Area: {country.area} Km²
              </Text>

              <View style={styles.separationLineContainer}>
                <View style={styles.separationLine} />
              </View>

              <View style={styles.countryTimeContainer}>
                <Text style={styles.countryNameText}>
                  Local Time: {localTime}
                </Text>
              </View>

              <View style={styles.separationLineContainer}>
                <View style={styles.separationLine} />
              </View>

              <Text style={styles.countryNameText}>
                Currency: {country !== undefined && currenciesValues}
              </Text>
            </View>

            <View style={styles.detailsLineContainer}>
              <View style={styles.detailsLine} />
              <View>
                <Text style={styles.detailsLineText}>Neighbours</Text>
              </View>
              <View style={styles.detailsLine} />
            </View>

            <View style={styles.neighboursContainer}>
              {neighbours !== undefined &&
                neighbours.map(neighbour => {
                  if (neighbour !== undefined) {
                    return (
                      <CountryButton
                        key={neighbour.alpha2Code}
                        alpha2Code={neighbour.alpha2Code}
                        country={neighbour.name}
                        onPress={navigateToNeighbour}
                      />
                    );
                  }
                })}
            </View>
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
  detailsLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  detailsLine: {
    flex: 1,
    height: 2,
    backgroundColor: 'white',
    marginBottom: 10,
    marginTop: 5,
  },
  detailsLineText: {
    width: 120,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Yrsa-Bold',
    fontSize: 20,
  },
  detailsContainer: {
    marginTop: 20,
    width: (Dimensions.get('window').width * 95) / 100,
    height: (Dimensions.get('window').width * 50) / 100,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  separationLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  separationLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
  },
  countryTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  neighboursContainer: {
    marginTop: 5,
    width: (Dimensions.get('window').width * 95) / 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CountryDetailsScreen;
