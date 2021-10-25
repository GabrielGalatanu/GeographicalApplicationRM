import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import CompletionBar from 'components/CompletionBar';
import QuizButton from 'components/QuizButton';
import QuizButtonsComponent from 'components/QuizButtonsComponent';
import GameTime from 'components/GameTime';

import Themes from 'constants/Themes';
import Question from 'models/question';
import {getQuestionsDataService} from 'services/GameScreenService';

import 'types/index';

/**
 * @param {GameScreenProps} props
 */

const GameScreen = props => {
  const {route} = props;
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState('');

  /**
   * @type {[Question[], React.Dispatch<React.SetStateAction<Question[]>>]}
   */
  const [questions, setQuestions] = useState([]);

  /**
   * @type {[number, React.Dispatch<React.SetStateAction<number>>]}
   */
  const [questionCounter, setQuestionCounter] = useState(0);

  /**
   * @type {[(null|number), React.Dispatch<React.SetStateAction<(null|number)>>]}
   */
  const [selectedVariant, setSelectedVariant] = useState(null);

  /**
   * @type {[(null[]|boolean[]), React.Dispatch<React.SetStateAction<(null[]|boolean[])>>]}
   */
  const [completionBarStatus, setCompletionBarStatus] = useState(
    new Array(15).fill(null),
  );

  useEffect(() => {
    const getQuestions = async () => {
      try {
        let response = await getQuestionsDataService(
          route.params.length,
          route.params.region,
          route.params.type,
        );

        setQuestions(response);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getQuestions();
  }, [route.params]);

  const variantButtonPressed = index => {
    setSelectedVariant(index);
  };

  const nextButtonPressed = () => {
    if (selectedVariant != null) {
      let selectedVariantID =
        questions[questionCounter].variantsArray[selectedVariant].id;
      questions[questionCounter].setSelectedAnswerID(selectedVariantID);

      let bar = [];
      bar = completionBarStatus;
      if (
        questions[questionCounter].correctAnswerID ===
        questions[questionCounter].selectedAnswerID
      ) {
        bar[questionCounter] = true;
      } else {
        bar[questionCounter] = false;
      }

      setCompletionBarStatus(bar);
      setSelectedVariant(null);
      setQuestionCounter(prevCount => prevCount + 1);
    }
  };

  const navigateBackToStatisticsScreen = () => {
    props.navigation.navigate('StatisticsScreen');
  };

  if (isLoading === false) {
    return (
      <LinearGradient
        colors={[
          Themes.colors.twitchGradientStart,
          Themes.colors.twitchGradientEnd,
        ]}
        style={styles.screen}>
        <View style={styles.quizTypeContainer}>
          <Text style={styles.quizTypeContainerText}>
            {route.params.type} Quiz
          </Text>
          {/* <Text style={styles.quizTypeContainerTime}>00:37</Text> */}
          <GameTime setTimer={time => setTimer(timer)} />
        </View>

        <View style={styles.quizQuestionCounterContainer}>
          <Text style={styles.quizQuestionCounterContainerText}>
            Question {questionCounter + 1}/{route.params.length}
          </Text>
        </View>

        <View style={styles.completionBarContainer}>
          <CompletionBar
            count={route.params.length}
            answerArray={completionBarStatus}
          />
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionContainerText}>
            {questions[questionCounter].questionString}
          </Text>
        </View>

        <QuizButtonsComponent
          gameType={route.params.type}
          variantsArray={questions[questionCounter].variantsArray}
          selectedVariant={selectedVariant}
          variantButtonPressed={index => variantButtonPressed(index)}
        />

        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={navigateBackToStatisticsScreen}>
            <View style={styles.quitButton}>
              <Text style={styles.quitButtonText}>Quit Quiz</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={nextButtonPressed}>
            <View
              style={[
                styles.nextButton,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  backgroundColor:
                    selectedVariant !== null ? '#06CFF2' : '#555D7A',
                },
              ]}>
              <Text style={styles.nextButtonText}>Next</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  } else {
    return (
      <LinearGradient
        colors={[
          Themes.colors.twitchGradientStart,
          Themes.colors.twitchGradientEnd,
        ]}
        style={styles.screen}>
        <ActivityIndicator size="large" color={Themes.colors.twitchHeader} />
      </LinearGradient>
    );
  }
};

export const screenOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  quizTypeContainer: {
    height: (Dimensions.get('window').width * 10) / 100,
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  quizTypeContainerText: {
    color: 'gray',
    fontSize: 20,
    fontFamily: 'Yrsa-Bold',
  },
  // quizTypeContainerTime: {
  //   color: 'gray',
  //   fontSize: 20,
  //   fontFamily: 'Yrsa-Bold',
  // },
  quizQuestionCounterContainer: {
    height: (Dimensions.get('window').width * 10) / 100,
    marginLeft: 10,
    justifyContent: 'center',
  },
  quizQuestionCounterContainerText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Yrsa-Bold',
  },
  completionBarContainer: {
    height: (Dimensions.get('window').width * 5) / 100,
  },
  questionContainer: {
    height: (Dimensions.get('window').width * 30) / 100,
    marginTop: 30,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
  },
  questionContainerText: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'Yrsa-Bold',
    textAlign: 'center',
  },
  bottomContainer: {
    width: (Dimensions.get('window').width * 100) / 100,
    height: (Dimensions.get('window').width * 20) / 100,
    marginBottom: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  quitButton: {
    borderRadius: 15,
    marginRight: 15,
    width: (Dimensions.get('window').width * 40) / 100,
    height: (Dimensions.get('window').width * 15) / 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quitButtonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Yrsa-Bold',
  },
  nextButton: {
    borderRadius: 15,
    marginRight: 15,
    width: (Dimensions.get('window').width * 40) / 100,
    height: (Dimensions.get('window').width * 15) / 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Yrsa-Bold',
  },
});

export default GameScreen;
