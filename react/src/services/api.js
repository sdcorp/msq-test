import axios from 'axios';

/**
 * Get exchange data for cryptocurrency
 * @param {string} symbol Cryptocurrency symbol(BTC, ETH etc)
 * @param {string} currency National currency(USD, RUB, UAH etc)
 */
export async function getCurrencyExchangeAPI(symbol = 'BTC', currency = 'USD') {
  const response = await axios.get(`/quotes/latest?symbol=${symbol}&convert=${currency}`);
  return response;
}

/**
 * Get initial data for all cryptocurrencies
 * @param {string} symbol
 * @param {array} currencies
 */
export async function getCurrencyExchangeByCryptoAPI(symbol = 'BTC', currencies = ['USD', 'RUB', 'UAH']) {
  //! The reason of theese multiple requests is limitation of API (free plan)
  const promises = currencies.map(currency => axios.get(`/quotes/latest?symbol=${symbol}&convert=${currency}`));
  const responses = await axios.all(promises);
  const quotes = responses.map(res => {
    const [currency, price] = Object.entries(res.data.data[symbol].quote)[0];
    return { [currency]: price.price };
  });
  return { symbol, quotes };
}

/**
|--------------------------------------------------
| We can work with all this data and filtering on Client-side
| But I do each user action via Backend-side by separate request
| Filtering on Client-side is bad practice...
|--------------------------------------------------
*/
