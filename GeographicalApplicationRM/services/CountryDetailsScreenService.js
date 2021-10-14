import * as RNLocalize from 'react-native-localize';
import {getCountryAPI, getCountryAPIByAlpha3} from 'http/restcountries';
import {getExchangeRateApiAsync} from 'http/exchangeratesapi';

import Country from 'models/country';

export const getCountryDetailsDataService = async countryName => {
  try {
    let countryDTO = await getCountryData(countryName);

    let neighboursArray = [];
    if (
      countryDTO[0].borders !== undefined &&
      countryDTO[0].borders.length > 0
    ) {
      neighboursArray = await getNeighboursData(countryDTO[0].borders);
    }

    //let currencyValue = await getCurrencyData(countryDTO[0].currencies[0].code);
    let currencyValue = 0.23;

    let countryData = {
      country: CountryMapper(countryDTO[0]),
      neighbours: neighboursArray,
      currencyValue: currencyValue,
    };

    return countryData;
  } catch (err) {
    console.log(err.message);
  }
};

const getCountryData = async countryName => {
  let country = await getCountryAPI(countryName);
  return country;
};

const getNeighboursData = async countryBorders => {
  let neighboursAlpha3Codes = countryBorders;
  let neighboursArray = [];
  for (var i = 0; i < neighboursAlpha3Codes.length; i++) {
    let neighbour = await getCountryAPIByAlpha3(neighboursAlpha3Codes[i]);

    neighboursArray.push({
      alpha2Code: neighbour.alpha2Code,
      name: neighbour.name,
    });
  }
  return neighboursArray;
};

const getCurrencyData = async countryCurrency => {
  let value = await getExchangeRateApiAsync(
    RNLocalize.getCurrencies()[0],
    countryCurrency,
  );
  return value;
};

const CountryMapper = CountryMapperDTO => {
  const CountryInfo = new Country(
    CountryMapperDTO.name,
    CountryMapperDTO.alpha2Code,
    CountryMapperDTO.flags.png,
    CountryMapperDTO.capital,
    CountryMapperDTO.population,
    CountryMapperDTO.area,
    CountryMapperDTO.currencies[0].code,
    CountryMapperDTO.timezones,
    CountryMapperDTO.borders,
  );

  return CountryInfo;
};
