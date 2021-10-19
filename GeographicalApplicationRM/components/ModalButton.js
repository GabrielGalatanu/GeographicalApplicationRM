import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import Themes from 'constants/Themes';

const ModalButton = props => {
  const [active, setActive] = useState(0);

  const onPressButton = () => {
    if (active === 1) {
      props.onPress();
    }
  };

  useEffect(() => {
    if (props.id === 'start') {
      if (
        props.selected.type !== '' &&
        props.selected.region !== '' &&
        props.selected.length !== ''
      ) {
        setActive(1);
      }
    }

    if (props.id === 'cancel') {
      setActive(1);
    }
  }, [props.selected, props.id]);

  return (
    <View style={styles.modalButtonContainer}>
      <TouchableOpacity
        style={[
          styles.modalButton,
          active ? styles.modalActive : styles.modalInactive,
        ]}
        onPress={() => onPressButton()}>
        <Text
          style={[
            styles.modalButtonText,
            active ? styles.modalTextActive : styles.modalTextInactive,
          ]}>
          {props.label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalButtonContainer: {
    width: '40%',
    height: '60%',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  modalButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: Themes.borders.widthValue,
    borderRadius: Themes.borders.radiusValue,
    backgroundColor: Themes.colors.twitchGradientStart,
  },
  modalButtonText: {
    fontSize: 30,

    letterSpacing: 1,
    fontFamily: 'Yrsa-Bold',
  },
  modalActive: {
    borderColor: Themes.colors.twitchHeader,
  },
  modalTextActive: {
    color: 'white',
  },
  modalInactive: {
    borderColor: 'gray',
  },
  modalTextInactive: {
    color: 'gray',
  },
});

export default ModalButton;
