import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Collapsible from 'react-native-collapsible';

export default function TimezonesSection({localTime}) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <>
      <View style={styles.detailsLineContainer}>
        <View style={styles.detailsLine} />
        <View>
          <Text style={styles.detailsLineText}>Time Zones</Text>
        </View>
        <View style={styles.detailsLine} />
      </View>

      <View style={styles.viewTimeZonesButton}>
        <TouchableOpacity
          onPress={() => {
            setIsCollapsed(prev => !prev);
          }}>
          <Text style={styles.viewTimeZonesButtonText}>View Timezones</Text>
        </TouchableOpacity>
      </View>

      <Collapsible collapsed={isCollapsed}>
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
      </Collapsible>
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
  viewTimeZonesButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  viewTimeZonesButtonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Yrsa-Bold',
  },
});
