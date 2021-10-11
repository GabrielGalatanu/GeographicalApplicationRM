import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';

import Themes from 'constants/Themes';

export default function CountryButton({alpha2Code, country, onPress}) {
  let countryFlagUrl =
    'https://www.countryflags.io/' + alpha2Code + '/flat/64.png';

  return (
    <TouchableOpacity style={styles.parent} onPress={() => onPress(country)}>
      <View style={styles.narrow}>
        <Image
          style={styles.logo}
          resizeMode={'cover'}
          source={{
            uri: countryFlagUrl,
          }}
        />
      </View>

      <View style={styles.wide}>
        <Text style={styles.countryText}>
          {country} ({alpha2Code})
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {},
  parent: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    width: (Dimensions.get('window').width * 90) / 100,
    height: 80,
  },
  narrow: {
    flex: 1,
    backgroundColor: Themes.colors.twitchGradientStart,
    borderWidth: Themes.borders.widthValue,
    borderRightWidth: 0,
    borderTopLeftRadius: Themes.borders.radiusValue,
    borderBottomLeftRadius: Themes.borders.radiusValue,
    borderColor: Themes.colors.twitchHeader,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wide: {
    flex: 2,
    backgroundColor: Themes.colors.twitchGradientStart,
    borderWidth: Themes.borders.widthValue,
    borderLeftWidth: 0,
    borderTopRightRadius: Themes.borders.radiusValue,
    borderBottomRightRadius: Themes.borders.radiusValue,
    borderColor: Themes.colors.twitchHeader,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logo: {
    width: 80,
    height: 80,
  },
  countryText: {
    fontSize: 15,
    color: 'white',
    letterSpacing: 1,
    fontFamily: 'Yrsa-Bold',
  },
});
