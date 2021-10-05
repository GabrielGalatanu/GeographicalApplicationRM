import React from 'react';

import {Platform} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CountriesListScreen, {
  screenOptions as CountriesListScreenOptions,
} from '../screens/study/CountriesListScreen';
import CountryDetailsScreen, {
  screenOptions as CountryDetailsScreenOptions,
} from '../screens/study/CountryDetailsScreen';
import RegionListScreen, {
  screenOptions as RegionListScreenOptions,
} from '../screens/study/RegionListScreen';
import StatisticsScreen, {
  screenOptions as StatisticsScreenOptions,
} from '../screens/game/StatisticsScreen';

const defaultNavOptions = {
  headerShown: false,
};

const StudyStackNavigator = createNativeStackNavigator();

export const StudyNavigator = () => {
  return (
    <StudyStackNavigator.Navigator >
      <StudyStackNavigator.Screen
        name="RegionListScreen"
        component={RegionListScreen}
        options={RegionListScreenOptions}
      />
      <StudyStackNavigator.Screen
        name="CountriesListScreen"
        component={CountriesListScreen}
        options={CountriesListScreenOptions}
      />
      <StudyStackNavigator.Screen
        name="CountryDetailScreen"
        component={CountryDetailsScreen}
        options={CountryDetailsScreenOptions}
      />
    </StudyStackNavigator.Navigator>
  );
};

const GameStackNavigator = createNativeStackNavigator();

export const GameNavigator = () => {
  return (
    <GameStackNavigator.Navigator>
      <GameStackNavigator.Screen
        name="StatisticsScreen"
        component={StatisticsScreen}
        options={StatisticsScreenOptions}
      />
    </GameStackNavigator.Navigator>
  );
};


const GeographicalBottomTabNavigator = createBottomTabNavigator();

export const GeographicalTabNavigator = () => {
  return (
    <GeographicalBottomTabNavigator.Navigator screenOptions={defaultNavOptions}>
      <GeographicalBottomTabNavigator.Screen
        name="Study"
        component={StudyNavigator}
      />
      <GeographicalBottomTabNavigator.Screen
        name="Game"
        component={GameNavigator}
      />
    </GeographicalBottomTabNavigator.Navigator>
  );
};
