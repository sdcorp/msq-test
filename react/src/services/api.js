import axios from 'axios';

/**
 * Get initial data for all cryptocurrencies
 * @param {string} symbol Cryptocurrency symbol(BTC, ETH etc)
 * @param {array} currencies National currency(USD, RUB, UAH etc)
 */
export async function getCurrencyExchangeByCryptoAPI(symbol = 'BTC', currencies = ['USD', 'RUB', 'UAH']) {
  //! The reason of theese multiple requests is limitation of API (free plan)
  const promises = currencies.map(currency => axios.get(`/quotes/latest?symbol=${symbol}&convert=${currency}`));
  const responses = await axios.all(promises);
  // Omega logic ... :) Can be optimized.
  const quotes = responses.map(res => {
    const [currency, price] = Object.entries(res.data.data[symbol].quote)[0];
    return { [currency]: price.price };
  });
  // We can use this data later, put into Redux and filtering for calculate output value.
  // But doing large filters on client-side is bad practice...
  // So I made separate API method for getting each exchange rate
  return { symbol, quotes };
}

/**
 * Get exchange data for cryptocurrency
 * @param {string} symbol Cryptocurrency symbol(BTC, ETH etc)
 * @param {string} currency National currency(USD, RUB, UAH etc)
 */
export async function getCurrencyExchangeAPI(symbol = 'BTC', currency = 'USD') {
  const response = await axios.get(`/quotes/latest?symbol=${symbol}&convert=${currency}`);
  return response;
}
