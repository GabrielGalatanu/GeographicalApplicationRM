import {getAllRegionsAPI} from 'http/restcountries';

export const getStatisticsDataService = async () => {
  try {
    let regionsDTO = await getAllRegionsAPI();

    return regionsDTO.data;
  } catch (err) {
    console.log(err);
  }
};
