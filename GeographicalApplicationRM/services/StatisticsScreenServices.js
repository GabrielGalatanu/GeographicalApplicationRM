import {getAllRegionsAPI} from 'http/restcountries';

export const getStatisticsDataService = async () => {
  try {
    let regionsDTO = await getAllRegionsAPI();
    let array = [];
    let arrayTemp = [];
    if (regionsDTO.data.promiseType === 'RegionDTO') {
      for (let i = 0; i < regionsDTO.data.json.length; i++) {
        arrayTemp.push(regionsDTO.data.json[i]);
        if (
          ((i + 1) % 3 === 0 && i > 0) ||
          i === regionsDTO.data.json.length - 1
        ) {
          array.push(arrayTemp);
          arrayTemp = [];
        }
      }
    }
    return array;
  } catch (err) {
    console.log(err);
  }
};
