import 'types/index.js';

const restCountriesBaseUrl = 'https://restcountries.com/v2';

/**
 * Returns all data about a country.
 *
 * @param {string} country - Country name.
 * @param {Function} ifError - A function to run in case of an error.
 * @returns {Promise<CountryArrayAPI[]>}
 */
export const getCountryAPI = async (country, ifError) => {
  try {
    const response = await fetch(`${restCountriesBaseUrl}/name/${country}`);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
    //ifError();
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
    const response = await fetch(`${restCountriesBaseUrl}/continent/${region}`);
    const json = await response.json();

    /**
     * @type {('CountryDTO'|'CountryFetchFailed')}
     */
    let promiseType;

    if (json.length === undefined) {
      promiseType = 'CountryFetchFailed';
    } else if (json.length > 0) {
      promiseType = 'CountryDTO';
    }

    let data = {data: {promiseType: promiseType, json: json}};

    return data;
  } catch (error) {
    let data = {
      data: {
        promiseType: 'CountryFetchError',
        json: {message: error.message},
      },
    };

    return data;
  }
};

export const getAllRegionsAPI = async () => {
  try {
    const response = await fetch(`${restCountriesBaseUrl}/all`);
    const json = await response.json();

    let regionArray = [];
    json.forEach(country => {
      regionArray.push(country.region);
    });

    let uniqueRegionArray = [];
    regionArray.forEach(c => {
      if (!uniqueRegionArray.includes(c)) {
        uniqueRegionArray.push(c);
      }
    });

    return uniqueRegionArray.sort();
  } catch (error) {
    return error;
  }
};
