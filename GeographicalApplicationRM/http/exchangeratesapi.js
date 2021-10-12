import ApiAccessKeyExchangeRateAPI from 'constants/ApiAccessKeyExchangeRateAPI';

export const getExchangeRateApiAsync = async (
  deviceCurrency,
  selectedCountryCurrency,
) => {
  try {
    let url = 'http://api.exchangeratesapi.io/v1/latest?';
    let apiKey = 'access_key=' + ApiAccessKeyExchangeRateAPI;
    let symbols = '&symbols=' + deviceCurrency + ',' + selectedCountryCurrency;

    let toFetchUrl = url + apiKey + symbols;

    let response = await fetch(toFetchUrl);
    let json = await response.json();

    let value =
      json.rates[selectedCountryCurrency] / json.rates[deviceCurrency];

    return value;
  } catch (error) {
    console.log(error.message);
  }
};
