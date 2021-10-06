import React, {useEffect, useState} from 'react';

import {StyleSheet, FlatList, Text, ActivityIndicator} from 'react-native';
import Colors from '../../constants/Colors';

import LinearGradient from 'react-native-linear-gradient';
import {getAllCountriesByRegionAPI} from '../../http/restcountries';

import CountryButton from '../../components/CountryButton';

const CountriesListScreen = props => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setCountries(await getAllCountriesByRegionAPI(props.route.params.region));
      setIsLoading(false);
    })();
  }, []);

  const navigateToCountryDetailScreen = (country) => {
    props.navigation.navigate('CountryDetailScreen', {country: country});
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
           <CountryButton alpha2Code={item.alpha2Code} country={item.name} onPress={navigateToCountryDetailScreen} />
          );
        }}
        keyExtractor={item => item.id}
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
});

export default CountriesListScreen;
