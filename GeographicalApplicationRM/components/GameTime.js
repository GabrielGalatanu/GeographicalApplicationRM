import React, {useEffect, useState} from 'react';
import {Text, StyleSheet} from 'react-native';

import moment from 'moment';

const GameTime = props => {
  const [time, setTime] = useState('00:00');

  useEffect(() => {
    let m = moment();
    m.set({minute: 0, second: 0});
    m.format('mm:ss');

    let countryTimeIntervalCounter = setInterval(() => {
      m.add(1, 'seconds');
      let minutes = m.minutes() > 9 ? `${m.minutes()}` : `0${m.minutes()}`;
      let seconds = m.seconds() > 9 ? `${m.seconds()}` : `0${m.seconds()}`;
      setTime(`${minutes}:${seconds}`);
      props.setTimer(`${minutes}:${seconds}`);
    }, 1000);

    return () => {
      clearInterval(countryTimeIntervalCounter);
    };
  }, [props]);

  return <Text style={styles.quizTypeContainerTime}>{time}</Text>;
};

const styles = StyleSheet.create({
  quizTypeContainerTime: {
    color: 'gray',
    fontSize: 20,
    fontFamily: 'Yrsa-Bold',
  },
});

export default GameTime;
