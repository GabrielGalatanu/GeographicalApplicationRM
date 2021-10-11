class Country {
  /**
   *
   * @param {string} name
   * @param {string} alpha2Code
   * @param {string} flagURL
   * @param {string} capital
   * @param {number} population
   * @param {number} area
   * @param {string} currency
   */
  constructor(name, alpha2Code, flagURL, capital, population, area, currency) {
    this.name = name;
    this.alpha2Code = alpha2Code;
    this.flagURL = flagURL;
    this.capital = capital;
    this.population = population;
    this.area = area;
    this.currency = currency;
  }
}

export default Country;
