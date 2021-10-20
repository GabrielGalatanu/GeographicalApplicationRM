import React, {useEffect} from 'react';

import {StyleSheet, Text, View} from 'react-native';

import 'types/index';

/**
 * @param {GameScreenProps} props
 */

const GameScreen = props => {
  useEffect(() => {
    console.log('insider');
    //props.navigation.dangerouslyGetParent()?.goBack();
    //props.navigation.popToTop();
    //props.navigation.goBack();
  }, [props.navigation]);

  return (
    <View style={styles.container}>
      <Text> Game Screen </Text>
    </View>
  );
};

export const screenOptions = () => {
  return {
    headerTitle: 'Game',
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GameScreen;