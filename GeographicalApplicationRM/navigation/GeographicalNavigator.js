import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
import StatisticsDetailsScreen, {
  screenOptions as StatisticsDetailsScreenOptions,
} from '../screens/game/StatisticsDetailsScreen';
import GameScreen, {
  screenOptions as GameScreenOptions,
} from '../screens/game/GameScreen';

import ModalGameConfiguration, {
  screenOptions as ModalGameConfigurationOptions,
} from 'components/ModalGameConfiguration';

import Themes from 'constants/Themes';
import 'types/index';

/**
 * @type {CreateNativeStackNavigatorResult<StudyStackParamList>}
 */

const StudyStackNavigator = createNativeStackNavigator();

export const StudyNavigator = () => {
  return (
    <StudyStackNavigator.Navigator>
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

/**
 * @type {CreateNativeStackNavigatorResult<GameStackParamList>}
 */

const GameStackNavigator = createNativeStackNavigator();

export const GameNavigator = () => {
  return (
    <GameStackNavigator.Navigator>
      <GameStackNavigator.Screen
        name="StatisticsScreen"
        component={StatisticsScreen}
        options={StatisticsScreenOptions}
      />
      <GameStackNavigator.Screen
        name="StatisticsDetailsScreen"
        component={StatisticsDetailsScreen}
        options={StatisticsDetailsScreenOptions}
      />
      <GameStackNavigator.Screen
        name="GameScreen"
        component={GameScreen}
        options={GameScreenOptions}
      />

      {/* <GameStackNavigator.Group screenOptions={{presentation: 'modal'}}>
        <GameStackNavigator.Screen
          name="ModalGameConfiguration"
          component={ModalGameConfiguration}
          options={ModalGameConfigurationOptions}
        />
      </GameStackNavigator.Group> */}
    </GameStackNavigator.Navigator>
  );
};

/**
 * @type {CreateBottomTabNavigatorType<BottomTabBarParamList>}
 */

const GeographicalBottomTabNavigator = createBottomTabNavigator();

export const GeographicalTabNavigator = () => {
  return (
    <GeographicalBottomTabNavigator.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Study') {
            iconName = 'book';
            return <FontAwesome name={iconName} size={30} color={color} />;
          }

          if (route.name === 'Game') {
            iconName = 'game-controller';
            return <Ionicons name={iconName} size={30} color={color} />;
          }
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Themes.colors.twitchBottom,
        },
        tabBarLabelStyle: {
          fontSize: 15,
          fontFamily: 'Yrsa-Bold',
        },
      })}>
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

const ApplicationMainStackNavigator = createNativeStackNavigator();

export function MainStackNavigator() {
  return (
    <ApplicationMainStackNavigator.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
      })}>
      <ApplicationMainStackNavigator.Screen
        name="Tabs"
        component={GeographicalTabNavigator}
      />
      <GameStackNavigator.Group screenOptions={{presentation: 'modal'}}>
        <GameStackNavigator.Screen
          name="ModalGameConfiguration"
          component={ModalGameConfiguration}
          options={ModalGameConfigurationOptions}
        />
      </GameStackNavigator.Group>
    </ApplicationMainStackNavigator.Navigator>
  );
}
