import moment, {utc} from 'moment';
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
  ) {
    this.name = name;
    this.alpha2Code = alpha2Code;
    this.flagURL = flagURL;
    this.capital = capital;
    this.population = population;
    this.area = area;
    this.currency = currency;
    this.timezones = timezones;
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
   * @returns {string} Local time based on the timezone selected.
   */

  getLocalTime() {
    let timeString = this.timezones[0];
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

    return momentTime;
  }
}

export default Country;
