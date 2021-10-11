import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

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

  useEffect(() => {
    (async () => {
      let response = await getAllRegionsAPI();
      setRegionArray(response);
    })();
  }, []);

  const navigateToCountriesListScreen = region => {
    props.navigation.navigate('CountriesListScreen', {region: region});
  };

  return (
    <LinearGradient
      colors={[
        Themes.colors.twitchGradientStart,
        Themes.colors.twitchGradientEnd,
      ]}
      style={styles.screen}>
      {/* <MenuButton label="Africa" onPress={navigateToCountriesListScreen} />
      <MenuButton label="Americas" onPress={navigateToCountriesListScreen} />
      <MenuButton label="Asia" onPress={navigateToCountriesListScreen} />
      <MenuButton label="Europe" onPress={navigateToCountriesListScreen} />
      <MenuButton label="Oceania" onPress={navigateToCountriesListScreen} /> */}

      {regionArray.map(region => {
        return (
          <MenuButton
            buttonCount={regionArray.length}
            label={region}
            onPress={() => navigateToCountriesListScreen(region)}
          />
        );
      })}
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
});

export default RegionListScreen;
