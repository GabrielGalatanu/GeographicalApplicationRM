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
    const response = await fetch(`${restCountriesBaseUrl}/name/${country}a`);
    const json = await response.json();
    return json;
  } catch (error) {
    //console.error(error);
    ifError();
  }
};

/**
 * Returns all countries from a region.
 *
 * @param {string} region - Region name. (Europe, Africa, Americas, Asia, Oceania)
 * @param {Function} ifError - A function to run in case of an error.
 * @returns {Promise<CountryArrayAPI[]>}
 */

export const getAllCountriesByRegionAPI = async (region, ifError) => {
  try {
    const response = await fetch(`${restCountriesBaseUrl}/continent/${region}`);
    const json = await response.json();

    return json;
  } catch (error) {
    //console.error(error);
    ifError();
  }
};
