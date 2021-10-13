import 'types/index.js';

const restCountriesBaseUrl = 'https://restcountries.com/v2';

/**
 * Returns all data about a country.
 *
 * @param {string} country - Country name.
 * @returns {Promise<CountryDTOData[]>}
 */
export const getCountryAPI = async country => {
  try {
    const response = await fetch(`${restCountriesBaseUrl}/name/${country}`);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};

/**
 * Returns all data about a country.
 *
 * @param {string} alpha3Code - Country alpha3Code
 * @returns {Promise<CountryDTOData>}
 */
export const getCountryAPIByAlpha3 = async alpha3Code => {
  try {
    const response = await fetch(`${restCountriesBaseUrl}/alpha/${alpha3Code}`);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};

/**
 * Returns all countries from a region.
 *
 * @param {string} region - Region name. (Europe, Africa, Americas, Asia, Oceania)
 * @returns {Promise<CountryFetchFailed|CountryDTO|CountryFetchError>}
 */

export const getAllCountriesByRegionAPI = async region => {
  try {
    //const response = await fetch(`${restCountriesBaseUrl}/continent/${region}`);
    //const json = await response.json();

    //TEMPORARY WHILE THE ENDPOINT IS NOT WORKING:
    const response = await fetch('https://restcountries.com/v2/all');
    let json = await response.json();

    let json2 = [];
    json.forEach(country => {
      if (country.region === region) {
        json2.push(country);
      }
    });

    json = json2;

    //TEMPORARY WHILE THE ENDPOINT IS NOT WORKING//

    /**
     * @type {('CountryDTO'|'CountryFetchFailed')}
     */
    let promiseType;

    if (json.length === undefined) {
      promiseType = 'CountryFetchFailed';
      return {data: {promiseType: promiseType, json: json}};
    } else if (json.length > 0) {
      promiseType = 'CountryDTO';
      return {data: {promiseType: promiseType, json: json}};
    }
  } catch (error) {
    return {
      data: {
        promiseType: 'CountryFetchError',
        json: {message: error.message},
      },
    };
  }
};

/**
 * @returns {Promise<RegionFetchFailed|RegionDTO|RegionFetchError>}
 */

export const getAllRegionsAPI = async () => {
  try {
    const response = await fetch(`${restCountriesBaseUrl}/all`);
    const json = await response.json();

    /**
     * @type {('RegionDTO'|'RegionFetchFailed')}
     */
    let promiseType;

    if (json.length === undefined) {
      promiseType = 'RegionFetchFailed';
      return {data: {promiseType: promiseType, json: json.message}};
    } else if (json.length > 0) {
      promiseType = 'RegionDTO';

      let uniqueRegionArray = [];

      json.forEach(country => {
        if (!uniqueRegionArray.includes(country.region)) {
          uniqueRegionArray.push(country.region);
        }
      });

      return {data: {promiseType: promiseType, json: uniqueRegionArray.sort()}};
    }
  } catch (error) {
    console.log(error);
    return {
      data: {
        promiseType: 'RegionFetchError',
        json: {message: error.message},
      },
    };
  }
};
