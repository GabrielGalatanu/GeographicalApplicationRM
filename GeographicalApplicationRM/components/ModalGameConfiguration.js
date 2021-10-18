import React, {useState, useEffect, useMemo} from 'react';
import {
  StyleSheet,
  Modal,
  Alert,
  View,
  Text,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';

import GameConfigurationButton from './GameConfigurationButton';
import Themes from 'constants/Themes';

const ModalGameConfiguration = props => {
  const [regionArray, setRegionArray] = useState([]);
  const [selectedRegionArray, setSelectedRegionArray] = useState([
    0, 0, 0, 0, 1, 0, 0, 0,
  ]);
  //new Array(8).fill(0),;
  const regionTempArray = useMemo(() => {
    return [
      ['Item1', 'Item2', 'Item3'],
      ['Item4', 'Item5', 'Item6'],
      ['Item7', 'Item8'],
    ];
  }, []);

  useEffect(() => {
    console.log('ok');
    setRegionArray(regionTempArray);
  }, [regionTempArray]);

  const onChangeRegion = index => {
    let array = new Array(8).fill(0);
    array[index] = 1;
    setSelectedRegionArray(array);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        props.changeVisible(!props.visible);
      }}>
      <View style={styles.modalContent}>
        <TouchableWithoutFeedback
          onPress={() => props.changeVisible(!props.visible)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <Button
          title="ok"
          onPress={() => {
            console.log(selectedRegionArray);
          }}
        />
        <View style={styles.modalView}>
          {/* Region Select: */}

          <View style={styles.gameConfigurationRegionContainer}>
            <Text style={styles.gameConfigurationText}> Region </Text>
            {regionArray.map((region, regionIndex) => {
              return (
                <View style={styles.gameConfigurationRegionRow}>
                  {region.map((element, elementIndex) => {
                    return (
                      <GameConfigurationButton
                        label={element}
                        selected={
                          selectedRegionArray[regionIndex * 3 + elementIndex]
                        }
                        onPress={onChangeRegion}
                        index={regionIndex * 3 + elementIndex}
                      />
                    );
                  })}
                </View>
              );
            })}
          </View>
          {/* Region Select// */}
          {/* Game Type Select: */}

          <View style={styles.GameConfigurationTypeContainer}>
            <Text style={styles.gameConfigurationText}> Type </Text>
            <View style={styles.GameConfigurationTypeRow}>
              <GameConfigurationButton />
              <GameConfigurationButton />
              <GameConfigurationButton />
            </View>
          </View>
          {/* Game Type Select// */}
          {/* Game Length: */}

          <View style={styles.GameConfigurationLengthContainer}>
            <Text style={styles.gameConfigurationText}> Length </Text>
            <View style={styles.GameConfigurationLengthRow}>
              <GameConfigurationButton />
              <GameConfigurationButton />
              <GameConfigurationButton />
            </View>
          </View>
          {/* Game Length// */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    height: '100%',
  },
  modalView: {
    width: '90%',
    height: '70%',
    margin: 10,
    backgroundColor: Themes.colors.twitchGradientStart,
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  gameConfigurationText: {
    fontSize: 20,
    color: 'white',
    letterSpacing: 1,
    fontFamily: 'Yrsa-Bold',
  },
  gameConfigurationRegionContainer: {
    flexDirection: 'column',
    width: '100%',
    height: '40%',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameConfigurationRegionRow: {
    flexDirection: 'row',
    width: '100%',
    //Depends on the number of regions. 100/number rows %
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  GameConfigurationTypeContainer: {
    flexDirection: 'column',
    width: '100%',
    height: '20%',
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  GameConfigurationTypeRow: {
    flexDirection: 'row',
    width: '100%',
    //Depends on the number of regions. 100/number rows %
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  GameConfigurationLengthContainer: {
    flexDirection: 'column',
    width: '100%',
    height: '20%',
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  GameConfigurationLengthRow: {
    flexDirection: 'row',
    width: '100%',
    //Depends on the number of regions. 100/number rows %
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ModalGameConfiguration;
