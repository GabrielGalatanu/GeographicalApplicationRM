import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';

import GameConfigurationButton from './GameConfigurationButton';
import ModalButton from './ModalButton';
import Themes from 'constants/Themes';
import {getStatisticsDataService} from 'services/StatisticsScreenServices';

import 'types/index';

/**
 * @param {ModalGameConfigurationProps} props
 */

const ModalGameConfiguration = props => {
  /**
   * @type {[buttonsArray, buttonsArrayStateSetter]}
   */
  const [buttonsArray, setButtonsArray] = useState({
    region: [],
    type: ['Capital', 'Flag', 'Neighbour'],
    length: [5, 10, 15],
  });

  /**
   * @type {[selectedArray, selectedArrayStateSetter]}
   */
  const [selectedArray, setSelectedArray] = useState({
    region: '',
    type: '',
    length: 0,
  });

  let buttonsPerRow = 3;

  useEffect(() => {
    const getData = async () => {
      try {
        let regions = await getStatisticsDataService();

        let array = [];

        if (regions.promiseType === 'RegionDTO') {
          for (let i = 0; i < regions.json.length; i++) {
            if ((i + 1) * buttonsPerRow < regions.json.length) {
              array.push(
                regions.json.slice(
                  i * buttonsPerRow,
                  i * buttonsPerRow + buttonsPerRow,
                ),
              );
            } else {
              array.push(
                regions.json.slice(i * buttonsPerRow, regions.json.length),
              );
              break;
            }
          }
        }

        setButtonsArray(prevButton => {
          return {...prevButton, region: array};
        });
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [buttonsPerRow]);

  const onChangeModal = (index, id) => {
    let selected;

    if (id === 'region') {
      selected =
        buttonsArray.region[Math.floor(index / buttonsPerRow)][
          index % buttonsPerRow
        ];
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
    props.navigation.goBack();
    props.navigation.navigate('GameScreen', selectedArray);
  };

  // numar magic sa schimb. (Done)
  // sa tipizez
  // react navigation sa prezint folosind un modal cu react navigation (Done)
  return (
    <View style={styles.modalContent}>
      <View style={styles.modalView}>
        {/* Region Select: */}

        <View style={styles.gameConfigurationRegionContainer}>
          <Text style={styles.gameConfigurationText}> Region </Text>
          {buttonsArray.region.map((region, regionIndex) => {
            return (
              <View key={regionIndex} style={styles.gameConfigurationRegionRow}>
                {region.map((element, elementIndex) => {
                  return (
                    <GameConfigurationButton
                      count={buttonsPerRow}
                      key={element}
                      id="region"
                      label={element}
                      selected={selectedArray.region}
                      onPress={onChangeModal}
                      index={regionIndex * buttonsPerRow + elementIndex}
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
                  count={buttonsPerRow}
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
                  count={buttonsPerRow}
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
            onPress={() => props.navigation.goBack()}
          />
        </View>

        {/* Start/cancel Buttons// */}
      </View>
    </View>
  );
};

export const screenOptions = () => {
  return {
    headerShown: true,
    headerTitle: 'Configuration',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: Themes.colors.twitchHeader,
    },
    headerTitleStyle: {
      fontFamily: 'Yrsa-Bold',
      fontSize: 25,
    },
  };
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
    width: '100%',
    height: '100%',
    margin: 10,
    backgroundColor: Themes.colors.twitchGradientStart,
    //borderRadius: 20,
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
