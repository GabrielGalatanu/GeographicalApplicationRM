import {getAllRegionsAPI, getAllCountriesByRegionAPI} from 'http/restcountries';
import Question from 'models/question';

export const getQuestionsDataService = async (length, region, type) => {
  try {
    if (type === 'Capital') {
      let countries = await getAllCountriesByRegionAPI(region);

      let variants = getVariants(countries.data.json, length, true, 3);

      let questionArray = [];

      for (let i = 0; i < length; i++) {
        let variantsArray = [];
        for (let j = 0; j < 4; j++) {
          variantsArray.push({
            id: j,
            variant: variants[i][j].capital,
          });
        }

        let questionString = `What is the capital of ${variants[i][0].name}?`;

        const question = new Question(
          i,
          0,
          null,
          questionString,
          variantsArray,
        );
        question.shuffle();

        questionArray.push(question);
      }

      return questionArray;
    }

    if (type === 'Flag') {
      let countries = await getAllCountriesByRegionAPI(region);

      let variants = getVariants(countries.data.json, length, true, 3);

      let questionArray = [];
      console.log('varianta: ');
      console.log(variants[0][0].flag);
      for (let i = 0; i < length; i++) {
        let variantsArray = [];
        for (let j = 0; j < 4; j++) {
          variantsArray.push({
            id: j,
            variant: variants[i][j].alpha2Code,
          });
        }

        let questionString = `What is the flag of ${variants[i][0].name}?`;

        const question = new Question(
          i,
          0,
          null,
          questionString,
          variantsArray,
        );

        question.shuffle();

        questionArray.push(question);
      }

      return questionArray;
    }
  } catch (err) {
    console.log(err);
  }
};

const getVariants = (
  arrayToShuffle,
  count,
  mainVariant,
  otherVariantsCount,
) => {
  let array = [...arrayToShuffle];
  let randomArray = [];

  for (let i = 0; i < count; i++) {
    let random = Math.floor(Math.random() * array.length);
    let randomVariant = array[random];

    let otherVariants = [];
    if (mainVariant === true) {
      let arrayTemp = [...arrayToShuffle];
      arrayTemp.splice(
        [...arrayToShuffle].findIndex(x => x.name === randomVariant.name),
        1,
      );

      otherVariants = getVariants(arrayTemp, otherVariantsCount, false, 0);
    }

    if (mainVariant === true) {
      randomArray.push([randomVariant, ...otherVariants]);
    } else {
      randomArray.push(randomVariant);
    }

    array.splice(random, 1);
  }

  return randomArray;
};
