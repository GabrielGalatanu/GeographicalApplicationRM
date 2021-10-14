import moment from 'moment';

/**
 * Class representing a country.
 */
class Country {
  /**
   * Create a country.
   *
   * @param {string} name
   * @param {string} alpha2Code
   * @param {string} flagURL
   * @param {string} capital
   * @param {number} population
   * @param {number} area
   * @param {string} currency
   * @param {string} timezones
   * @param {string[]} borders
   */
  constructor(
    name,
    alpha2Code,
    flagURL,
    capital,
    population,
    area,
    currency,
    timezones,
    borders,
  ) {
    this.name = name;
    this.alpha2Code = alpha2Code;
    this.flagURL = flagURL;
    this.capital = capital;
    this.population = population;
    this.area = area;
    this.currency = currency;
    this.timezones = timezones;
    this.borders = borders;
  }

  /**
   * The method goes here
   *
   * @returns {string} Return abecedar.
   */

  test() {
    return 'abecedar';
  }

  /**
   * Method that returns the current time.
   *
   * @returns {{timezone: string, time: string}[]} Local time based on the timezone selected.
   */

  getLocalTime() {
    let times = [];
    for (let i = 0; i < this.timezones.length; i++) {
      let timeString = this.timezones[i];
      let hours = '';
      let minutes = '';
      let isNegative = 1;

      if (timeString.includes('-')) {
        isNegative = -1;
      }

      hours = timeString.replace('UTC', '');
      hours = hours.substring(1, hours.length);

      if (hours.includes(':')) {
        minutes = hours.substring(hours.indexOf(':') + 1, hours.length);
        hours = hours.substring(0, hours.indexOf(':'));
      }
      var momentTime = moment
        .utc()
        .add(parseInt(hours, 10) * isNegative, 'hours')
        .add(parseInt(minutes, 10) * isNegative, 'minutes')
        .format('h:mm:ss a');

      times.push({timezone: this.timezones[i], time: momentTime});
    }

    return times;
  }

  /**
   *  Method that takes two currencies (ex: getCurrenciesValueComparison('EUR','RON')) and returns a string that displays how much one currency is valued based on the other.
   *
   * @param {number} value
   * @param {string} deviceCurrency
   * @param {string} selectedCountryCurrency
   * @returns {string} A string that displays the value difference between the two currencies.
   */
  getCurrenciesValueComparison = (
    value,
    deviceCurrency,
    selectedCountryCurrency,
  ) => {
    let valueString = `${selectedCountryCurrency} (1 ${deviceCurrency} = ${value.toFixed(
      2,
    )} ${selectedCountryCurrency})`;

    return valueString;
  };
}

export default Country;
