import {
  getCountryAPIByAlpha3,
  getAllCountriesByRegionAPI,
} from 'http/restcountries';
import Question from 'models/question';

export const getQuestionsDataService = async (length, region, type) => {
  try {
    let countries = await getAllCountriesByRegionAPI(region);

    let questionString = '';
    let questionArray = [];

    if (type === 'Capital') {
      let variants = getVariants(countries.data.json, length, true, 3);

      for (let i = 0; i < length; i++) {
        let variantsArray = createVariantObjectsForQuestionClass(
          variants,
          i,
          type,
        );

        questionString = `What is the capital of ${variants[i][0].name}?`;

        const question = questionMapper(i, questionString, variantsArray);

        questionArray.push(question);
      }
    }

    if (type === 'Flag') {
      let variants = getVariants(countries.data.json, length, true, 3);

      for (let i = 0; i < length; i++) {
        let variantsArray = createVariantObjectsForQuestionClass(
          variants,
          i,
          type,
        );

        questionString = `What is the flag of ${variants[i][0].name}?`;

        const question = questionMapper(i, questionString, variantsArray);

        questionArray.push(question);
      }
    }

    if (type === 'Neighbour') {
      removeCountriesThatHaveNoNeighbours(countries.data.json);

      let variants = getVariants(countries.data.json, length, false, 3);

      for (let i = 0; i < variants.length; i++) {
        let tempCountries = [...countries.data.json];

        let correctNeighbour = await pickCorrectNeighbour(
          tempCountries,
          variants,
          i,
        );

        //???
        removeCountryAndNeighboursFromArray(tempCountries, variants, i);

        let incorrectNeighbours = getVariants(tempCountries, 3, false, 0);

        let array = [correctNeighbour, ...incorrectNeighbours];

        let variantsArray = createVariantObjectsForQuestionClass(
          array,
          i,
          type,
        );

        questionString = `Who is the neighbour of ${variants[i].name}?`;

        const question = questionMapper(i, questionString, variantsArray);

        questionArray.push(question);
      }
    }

    return questionArray;
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

/**
 * @param {CountryDTOData[]} variants
 * @param {number} index
 * @param {string} type
 */

const createVariantObjectsForQuestionClass = (variants, index, type) => {
  let variantsArray = [];
  if (type === 'Capital') {
    for (let j = 0; j < 4; j++) {
      variantsArray.push({
        id: j,
        variant: variants[index][j].capital,
      });
    }
  } else if (type === 'Flag') {
    for (let j = 0; j < 4; j++) {
      variantsArray.push({
        id: j,
        variant: variants[index][j].alpha2Code,
      });
    }
  } else if (type === 'Neighbour') {
    for (let j = 0; j < variants.length; j++) {
      variantsArray.push({
        id: j,
        variant: variants[j].name,
      });
    }
  }
  return variantsArray;
};

/**
 * @param {number} index
 * @param {string} questionString
 * @param {{id: number, variant: string}[]} variantsArray
 * @returns {Question}
 */

const questionMapper = (index, questionString, variantsArray) => {
  let question = new Question(index, 0, null, questionString, variantsArray);
  question.shuffle();
  return question;
};

/**
 * @param {CountryDTOData[]} array
 */
const removeCountriesThatHaveNoNeighbours = array => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].borders === undefined || array[i].borders.length === 0) {
      array.splice(i, 1);
    }
  }
};

/**
 * @param {CountryDTOData[]} tempCountries
 * @param {CountryDTOData[]} variants
 * @param {number} indexCountry
 */
const removeCountryAndNeighboursFromArray = (
  tempCountries,
  variants,
  indexCountry,
) => {
  for (let j = 0; j < variants[indexCountry].borders.length; j++) {
    let index = tempCountries.findIndex(
      x => x.alpha3Code === variants[indexCountry].borders[j],
    );

    tempCountries.splice(index, 1);
  }

  let index = tempCountries.findIndex(
    x => x.alpha3Code === variants[indexCountry].alpha3Code,
  );
  tempCountries.splice(index, 1);
};

/**
 * @param {CountryDTOData[]} tempCountries
 * @param {CountryDTOData[]} variants
 * @param {number} index
 * @returns {Promise<CountryDTOData>} Returns the correct variant neighbour.
 */

const pickCorrectNeighbour = async (tempCountries, variants, index) => {
  let randomCorrectNeighbour = Math.floor(
    Math.random() * variants[index].borders.length,
  );

  let correctNeighbourIndex = tempCountries.findIndex(
    x => x.alpha3Code === variants[index].borders[randomCorrectNeighbour],
  );

  // In case the neighbour is in another region
  let correctNeighbour;
  if (correctNeighbourIndex === -1) {
    correctNeighbour = await getCountryAPIByAlpha3(
      variants[index].borders[randomCorrectNeighbour],
    );
  } else {
    correctNeighbour = tempCountries[correctNeighbourIndex];
  }

  return correctNeighbour;
};
