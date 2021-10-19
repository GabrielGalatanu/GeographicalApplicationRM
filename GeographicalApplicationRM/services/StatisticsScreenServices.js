import {getAllRegionsAPI} from 'http/restcountries';

export const getStatisticsDataService = async () => {
  try {
    let regionsDTO = await getAllRegionsAPI();
    let array = [];
    if (regionsDTO.data.promiseType === 'RegionDTO') {
      for (let i = 0; i < regionsDTO.data.json.length; i++) {
        if ((i + 1) * 3 < regionsDTO.data.json.length) {
          array.push(regionsDTO.data.json.slice(i * 3, i * 3 + 3));
        } else {
          array.push(
            regionsDTO.data.json.slice(i * 3, regionsDTO.data.json.length),
          );
          break;
        }
      }
    }
    console.log(array);
    return array;
  } catch (err) {
    console.log(err);
  }
};
