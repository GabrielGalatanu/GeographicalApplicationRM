import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

import CountryButton from 'components/CountryButton';

export default function NeighboursSection(props) {
  const {neighbours} = props;

  return (
    <>
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
                  onPress={() => props.onPress(neighbour.name)}
                />
              );
            }
          })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
    marginTop: 5,
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
    marginTop: 10,
    marginBottom: 10,
    width: (Dimensions.get('window').width * 95) / 100,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  neighboursContainer: {
    marginTop: 5,
    width: (Dimensions.get('window').width * 95) / 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
