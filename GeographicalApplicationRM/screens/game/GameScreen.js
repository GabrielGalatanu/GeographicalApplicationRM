import React, {useEffect, useState, useRef, useCallback} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CompletionBar from 'components/CompletionBar';

import QuizButtonsComponent from 'components/QuizButtonsComponent';
import GameScreenBottomButton from 'components/GameScreenBottomButton';
import GameTime from 'components/GameTime';

import Themes from 'constants/Themes';
import Question from 'models/question';
import Statistic from 'models/statistic';
import {getQuestionsDataService} from 'services/GameScreenService';
import {saveGameStatisticsAsyncStorage} from 'services/StatisticsScreenServices';

import 'types/index';

import {useDispatch} from 'react-redux';
import * as statisticsActions from '../../store/actions/statistics';

/**
 * @param {GameScreenProps} props
 */

const GameScreen = props => {
  const {route} = props;
  const dispatch = useDispatch();

  /**
   * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   */
  const [isLoading, setIsLoading] = useState(true);

  /**
   * @type {[Question[], React.Dispatch<React.SetStateAction<Question[]>>]}
   */
  const [questions, setQuestions] = useState([]);

  /**
   * @type {[number, React.Dispatch<React.SetStateAction<number>>]}
   */
  const [questionCounter, setQuestionCounter] = useState(0);

  /**
   * @type {[null[]|number[], React.Dispatch<React.SetStateAction<(null[]|number[])>>]}
   */
  const [selectedVariantsArray, setSelectedVariantArray] = useState(
    new Array(route.params.length).fill(null),
  );

  /**
   * @type {[(null[]|boolean[]), React.Dispatch<React.SetStateAction<(null[]|boolean[])>>]}
   */
  const [completionBarStatus, setCompletionBarStatus] = useState(
    new Array(route.params.length).fill(null),
  );

  /**
   * @type {[boolean, React.Dispatch<React.SetStateAction<(boolean)>>]}
   */
  const [gameIsDone, setGameIsDone] = useState(false);

  let timer = useRef('');
  let correctAnswersCount = useRef(0);

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
    // setSelectedVariant(index);

    let array = [...selectedVariantsArray];
    array[questionCounter] = index;
    setSelectedVariantArray(array);

    let completionBar = [...completionBarStatus];
    completionBar[questionCounter] = true;
    setCompletionBarStatus(completionBar);

    for (let i = 0; i < props.route.params.length; i++) {
      if (array[i] === null) {
        break;
      }
      if (i === props.route.params.length - 1) {
        setGameIsDone(true);
      }
    }
  };

  const completionBarPressed = index => {
    setQuestionCounter(index);
  };

  const scrollFunction = direction => {
    if (direction === 'prev') {
      if (questionCounter !== 0) {
        setQuestionCounter(prev => prev - 1);
      }
    } else {
      if (questionCounter !== route.params.length - 1) {
        setQuestionCounter(prev => prev + 1);
      }
    }
  };

  const submitButton = async () => {
    for (let i = 0; i < props.route.params.length; i++) {
      let selectedVariantID =
        questions[i].variantsArray[selectedVariantsArray[i]].id;

      questions[i].setSelectedAnswerID(selectedVariantID);

      if (questions[i].correctAnswerID === questions[i].selectedAnswerID) {
        correctAnswersCount.current++;
      }
    }

    let statistics = new Statistic(
      moment().format('MMMM Do YYYY, h:mm:ss a'),
      timer.current,
      route.params.type,
      correctAnswersCount.current,
      questions,
    );

    //SAVE THE STATISTIC USING THE SERVICE:
    //await saveGameStatisticsAsyncStorage(statistics);

    dispatch(statisticsActions.saveStatistics(statistics));
    props.navigation.goBack();
  };

  const navigateBackToStatisticsScreen = () => {
    props.navigation.navigate('StatisticsScreen');
  };

  const getTimer = useCallback(time => {
    timer.current = time;
  }, []);

  if (isLoading !== true) {
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

          <GameTime setTimer={getTimer} />
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
            onPress={index => completionBarPressed(index)}
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
          questionNumber={questionCounter}
          selectedVariantsArray={selectedVariantsArray}
          variantButtonPressed={index => variantButtonPressed(index)}
        />

        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={navigateBackToStatisticsScreen}>
            <View style={styles.quitButton}>
              <Text style={styles.quitButtonText}>Quit Quiz</Text>
            </View>
          </TouchableOpacity>

          <GameScreenBottomButton
            text="Prev"
            available={questionCounter > 0}
            onPress={() => scrollFunction('prev')}
          />
          <GameScreenBottomButton
            text="Next"
            available={questionCounter < props.route.params.length - 1}
            onPress={() => scrollFunction('next')}
          />
          <GameScreenBottomButton
            text="Submit"
            available={gameIsDone !== false}
            onPress={submitButton}
          />
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
    marginLeft: 5,
    marginRight: 5,
    width: (Dimensions.get('window').width * 20) / 100,
    height: (Dimensions.get('window').width * 10) / 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quitButtonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Yrsa-Bold',
  },
});

export default GameScreen;
