/**
 * Returns all data about a country.
 *
 * @param {string} country - Country name.
 * @returns {Object}
 */
export const getCountryAPI = async country => {
  try {
    const response = await fetch(
      `https://restcountries.com/v2/name/${country}`,
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Returns all countries from a region.
 *
 * @param {string} region - Region name. (Europe, Africa, Americas, Asia, Oceania)
 * @returns {Object}
 */

export const getAllCountriesByRegionAPI = async region => {
  try {
    const response = await fetch(
      `https://restcountries.com/v2/continent/${region}`,
    );
    const json = await response.json();

    return json;
  } catch (error) {
    console.error(error);
  }
};
