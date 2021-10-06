import React, {useEffect, useState} from 'react';

import {StyleSheet} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';

import MenuButton from '../../components/MenuButton';

const RegionListScreen = props => {
  useEffect(() => {
    // (async () => {
    //   setCountries(await getCountryAPI('romania'));
    // })();
  }, []);

  return (
    <LinearGradient
      colors={[Colors.twitchGradientStart, Colors.twitchGradientEnd]}
      style={styles.screen}>
      <MenuButton label="Africa" />
      <MenuButton label="America" />
      <MenuButton label="Asia" />
      <MenuButton label="Europe" />
      <MenuButton label="Oceania" />
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
    backgroundColor: '#9FA8DA',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegionListScreen;
