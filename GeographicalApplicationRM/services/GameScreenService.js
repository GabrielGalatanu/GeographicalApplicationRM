import {getAllRegionsAPI, getAllCountriesByRegionAPI} from 'http/restcountries';
import Question from 'models/question';

export const getQuestionsDataService = async (length, region, type) => {
  try {
    // let testingArray = [
    //   {name: 'item1'},
    //   {name: 'item2'},
    //   {name: 'item3'},
    //   {name: 'item4'},
    //   {name: 'item5'},
    //   {name: 'item6'},
    //   {name: 'item7'},
    //   {name: 'item8'},
    //   {name: 'item9'},
    //   {name: 'item10'},
    //   {name: 'item11'},
    //   {name: 'item12'},
    // ];

    // let test = shuffle(testingArray, 5, true);
    // for (let i = 0; i < test.length; i++) {
    //   console.log('======');
    //   console.log(test[i][0].name);
    //   console.log(test[i][1].name);
    //   console.log(test[i][2].name);
    //   console.log(test[i][3].name);
    //   console.log('======');
    // }

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
//for (let i = 0; i < variants.length; i++) {
//     console.log('======');
//     console.log(variants[i][0].name);
//     console.log(variants[i][1].name);
//     console.log(variants[i][2].name);
//     console.log(variants[i][3].name);
//     console.log('======');
//   }
