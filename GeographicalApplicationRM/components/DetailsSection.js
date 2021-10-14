import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

export default function DetailsSection({country, currenciesValues}) {
  return (
    <>
      <View style={styles.detailsLineContainer}>
        <View style={styles.detailsLine} />
        <View>
          <Text style={styles.detailsLineText}>Details</Text>
        </View>
        <View style={styles.detailsLine} />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.countryNameText}>Capital: {country.capital}</Text>

        <View style={styles.separationLineContainer}>
          <View style={styles.separationLine} />
        </View>

        <Text style={styles.countryNameText}>
          Population: {country.population}
        </Text>

        <View style={styles.separationLineContainer}>
          <View style={styles.separationLine} />
        </View>

        <Text style={styles.countryNameText}>Area: {country.area} Km²</Text>

        <View style={styles.separationLineContainer}>
          <View style={styles.separationLine} />
        </View>

        <Text style={styles.countryNameText}>
          Currency: {country !== undefined && currenciesValues}
        </Text>
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
  separationLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  separationLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
  },
});
