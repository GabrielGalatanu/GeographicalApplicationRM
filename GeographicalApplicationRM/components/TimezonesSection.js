import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

export default function TimezonesSection({localTime}) {
  return (
    <>
      <View style={styles.detailsLineContainer}>
        <View style={styles.detailsLine} />
        <View>
          <Text style={styles.detailsLineText}>Time Zones</Text>
        </View>
        <View style={styles.detailsLine} />
      </View>

      <View style={styles.timezonesContainer}>
        {localTime.map((time, index) => {
          if (index === localTime.length - 1) {
            return (
              <>
                <Text key={time.timezone} style={styles.countryNameText}>
                  {time.timezone}: {'   '} {time.time}
                </Text>
              </>
            );
          }
          return (
            <>
              <Text key={time.timezone} style={styles.countryNameText}>
                {time.timezone}: {'   '} {time.time}
              </Text>
              <View style={styles.separationLineContainer}>
                <View style={styles.separationLine} />
              </View>
            </>
          );
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
  timezonesContainer: {
    marginTop: 10,
    marginBottom: 10,
    width: (Dimensions.get('window').width * 95) / 100,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
