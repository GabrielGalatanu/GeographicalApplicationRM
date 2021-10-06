import React, {useEffect} from 'react';

import {StyleSheet} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Colors from 'constants/Colors';
import MenuButton from 'components/MenuButton';

const RegionListScreen = props => {
  useEffect(() => {
    // (async () => {
    //   setCountries(await getCountryAPI('romania'));
    // })();
  }, []);

  const navigateToCountriesListScreen = region => {
    props.navigation.navigate('CountriesListScreen', {region: region});
  };

  return (
    <LinearGradient
      colors={[Colors.twitchGradientStart, Colors.twitchGradientEnd]}
      style={styles.screen}>
      <MenuButton label="Africa" onPress={navigateToCountriesListScreen} />
      <MenuButton label="America" onPress={navigateToCountriesListScreen} />
      <MenuButton label="Asia" onPress={navigateToCountriesListScreen} />
      <MenuButton label="Europe" onPress={navigateToCountriesListScreen} />
      <MenuButton label="Oceania" onPress={navigateToCountriesListScreen} />
    </LinearGradient>
  );
};

export const screenOptions = () => {
  return {
    headerTitle: 'Regions!',
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

export default RegionListScreen;
