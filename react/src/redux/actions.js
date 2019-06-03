import * as actionType from './constants';

export const getCurrencyExchangeRequest = () => ({ type: actionType.CURRENCY_EXCHANGE_REQUEST });

export const getCurrencyExchangeSuccess = data => ({ type: actionType.CURRENCY_EXCHANGE_SUCCESS, payload: data });

export const getCurrencyExchangeFailure = msg => ({ type: actionType.CURRENCY_EXCHANGE_FAILURE, payload: msg });

export const selectCrypto = crypto => ({ type: actionType.SELECT_CRYPTO, payload: crypto });

export const selectCurrency = currency => ({ type: actionType.SELECT_CURRENCY, payload: currency });

// CURRENCY_EXCHANGE_TRIGGERED. Saga triger action
export const getCurrencyExchangeTriggered = (params = {}) => ({
  type: actionType.CURRENCY_EXCHANGE_TRIGGERED,
  payload: params
});
