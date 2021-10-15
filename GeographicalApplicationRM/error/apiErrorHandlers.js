import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import Themes from 'constants/Themes';

export const apiErrorHandler = (type, reloadButtonHandler) => {
  switch (type) {
    case '_LOADING':
      return createLoadingContent();

    case 'RegionFetchError':
      return createErrorContent(type, reloadButtonHandler);

    case 'RegionFetchFailed':
      return createErrorContent(type, reloadButtonHandler);

    case 'CountryFetchError':
      return createErrorContent2(type, reloadButtonHandler);

    case 'CountryFetchFailed':
      return createErrorContent2(type, reloadButtonHandler);

    default:
      return 'create_main_content';
  }
};

const createErrorContent = (type, reloadButtonHandler) => {
  return (
    <>
      <Text style={styles.errorText}>{type}</Text>
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

const createErrorContent2 = (type, reloadButtonHandler) => {
  return (
    <>
      <Text style={styles.errorText}>{type}</Text>
      <Text style={styles.errorText}>O alta erroare</Text>
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

const createLoadingContent = () => {
  return (
    <>
      <ActivityIndicator size="large" color={Themes.colors.twitchHeader} />
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
