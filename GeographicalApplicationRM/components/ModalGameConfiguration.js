import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Modal,
  Alert,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

import GameConfigurationButton from './GameConfigurationButton';
import ModalButton from './ModalButton';
import Themes from 'constants/Themes';
import {getStatisticsDataService} from 'services/StatisticsScreenServices';

const ModalGameConfiguration = props => {
  const [buttonsArray, setButtonsArray] = useState({
    region: [],
    type: ['Capital', 'Flag', 'Neighbour'],
    length: [5, 10, 15],
  });

  const [selectedArray, setSelectedArray] = useState({
    region: '',
    type: '',
    length: '',
  });

  useEffect(() => {
    const getData = async () => {
      try {
        let regions = await getStatisticsDataService();
        setButtonsArray(prevButton => {
          return {...prevButton, region: regions};
        });
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const onChangeModal = (index, id) => {
    let selected;

    if (id === 'region') {
      selected = buttonsArray.region[Math.floor(index / 3)][index % 3];
    } else if (id === 'type') {
      selected = buttonsArray.type[index];
    } else if (id === 'length') {
      selected = buttonsArray.length[index];
    }

    setSelectedArray(prevSelected => {
      return {...prevSelected, [id]: selected};
    });
  };

  const navigateToGame = () => {
    props.changeVisible(!props.visible);
    props.navigateToGame(selectedArray);
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

        <View style={styles.modalView}>
          {/* Region Select: */}

          <View style={styles.gameConfigurationRegionContainer}>
            <Text style={styles.gameConfigurationText}> Region </Text>
            {buttonsArray.region.map((region, regionIndex) => {
              return (
                <View
                  key={regionIndex}
                  style={styles.gameConfigurationRegionRow}>
                  {region.map((element, elementIndex) => {
                    return (
                      <GameConfigurationButton
                        key={element}
                        id="region"
                        label={element}
                        selected={selectedArray.region}
                        onPress={onChangeModal}
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

          <View style={styles.gameConfigurationTypeContainer}>
            <Text style={styles.gameConfigurationText}> Type </Text>
            <View style={styles.gameConfigurationTypeRow}>
              {buttonsArray.type.map((type, index) => {
                return (
                  <GameConfigurationButton
                    key={type}
                    id="type"
                    label={type}
                    selected={selectedArray.type}
                    onPress={onChangeModal}
                    index={index}
                  />
                );
              })}
            </View>
          </View>
          {/* Game Type Select// */}
          {/* Game Length: */}

          <View style={styles.gameConfigurationLengthContainer}>
            <Text style={styles.gameConfigurationText}> Length </Text>
            <View style={styles.gameConfigurationLengthRow}>
              {buttonsArray.length.map((length, index) => {
                return (
                  <GameConfigurationButton
                    key={length}
                    id="length"
                    label={length}
                    selected={selectedArray.length}
                    onPress={onChangeModal}
                    index={index}
                  />
                );
              })}
            </View>
          </View>
          {/* Game Length// */}

          {/* Start/cancel Buttons: */}
          <View style={styles.buttonsContainer}>
            <ModalButton
              key={'start'}
              selected={selectedArray}
              id="start"
              label="Start"
              onPress={navigateToGame}
            />
            <ModalButton
              key={'cancel'}
              id="cancel"
              label="Cancel"
              onPress={() => props.changeVisible(!props.visible)}
            />
          </View>

          {/* Start/cancel Buttons// */}
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
    height: '75%',
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
  gameConfigurationTypeContainer: {
    flexDirection: 'column',
    width: '100%',
    height: '20%',
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameConfigurationTypeRow: {
    flexDirection: 'row',
    width: '100%',
    //Depends on the number of regions. 100/number rows %
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameConfigurationLengthContainer: {
    flexDirection: 'column',
    width: '100%',
    height: '20%',
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameConfigurationLengthRow: {
    flexDirection: 'row',
    width: '100%',
    //Depends on the number of regions. 100/number rows %
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '15%',
  },
});

export default ModalGameConfiguration;
