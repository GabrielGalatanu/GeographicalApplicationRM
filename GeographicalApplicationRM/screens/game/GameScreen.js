import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import CompletionBar from 'components/CompletionBar';
import QuizButton from 'components/QuizButton';

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
   * @type {[(null[]|number[]), React.Dispatch<React.SetStateAction<(null[]|number[])>>]}
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
    //verific daca o varianta a fost selectata;
    if (selectedVariant != null) {
      //concatenez raspunsurile intr un array;
      let selectedVariantID =
        questions[questionCounter].variantsArray[selectedVariant].id;
      questions[questionCounter].setSelectedAnswerID(selectedVariantID);

      //updatez statusBar-ul;
      let bar = [];
      bar = completionBarStatus;
      if (
        questions[questionCounter].correctAnswerID ===
        questions[questionCounter].selectedAnswerID
      ) {
        bar[questionCounter] = 1;
      } else {
        bar[questionCounter] = 0;
      }
      setCompletionBarStatus(bar);
      //resetez varianta selectata
      setSelectedVariant(null);
      //updatez counterul
      setQuestionCounter(prevCount => prevCount + 1);
    }
  };

  const navigateBackToStatisticsScreen = () => {
    props.navigation.navigate('StatisticsScreen');
  };

  const test = () => {
    console.log('alo');
    console.log(questions[questionCounter].questionString);
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
          <Text style={styles.quizTypeContainerTime}>00:37</Text>
        </View>
        {/* <Button title="test" onPress={() => test()} /> */}
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

        <View style={styles.answerOptionsContainer}>
          <QuizButton
            index={0}
            text={questions[questionCounter].variantsArray[0].variant}
            selected={selectedVariant}
            onPress={index => variantButtonPressed(index)}
          />
          <QuizButton
            index={1}
            text={questions[questionCounter].variantsArray[1].variant}
            selected={selectedVariant}
            onPress={index => variantButtonPressed(index)}
          />
          <QuizButton
            index={2}
            text={questions[questionCounter].variantsArray[2].variant}
            selected={selectedVariant}
            onPress={index => variantButtonPressed(index)}
          />
          <QuizButton
            index={3}
            text={questions[questionCounter].variantsArray[3].variant}
            selected={selectedVariant}
            onPress={index => variantButtonPressed(index)}
          />
        </View>

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
    return <View></View>;
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
  quizTypeContainerTime: {
    color: 'gray',
    fontSize: 20,
    fontFamily: 'Yrsa-Bold',
  },
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
    marginLeft: 4,
    marginRight: 4,
    justifyContent: 'center',
  },
  questionContainerText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Yrsa-Bold',
    textAlign: 'center',
  },
  answerOptionsContainer: {
    marginTop: 30,
    height: (Dimensions.get('window').width * 60) / 100,
    marginHorizontal: 10,
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
