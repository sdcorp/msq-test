import { takeEvery, put, call } from 'redux-saga/effects';
import { CURRENCY_EXCHANGE_TRIGGERED } from './constants';
import { actions as toastrActions } from 'react-redux-toastr';
import * as actionCreators from './actions';
import { getCurrencyExchangeAPI } from '../services/api';

// Saga Watcher
export default function* watchFetch() {
  yield takeEvery(CURRENCY_EXCHANGE_TRIGGERED, getCurrencyExchange);
}

// Saga Worker
function* getCurrencyExchange(action) {
  const { crypto, currency } = action.payload;
  try {
    yield put(actionCreators.getCurrencyExchangeRequest());
    const response = yield call(getCurrencyExchangeAPI, crypto, currency);
    console.log('CRYPTO_DATA', response);
    yield put(actionCreators.getCurrencyExchangeSuccess(response.data.data));
  } catch (error) {
    console.error(error);
    const message = error.response.data.error;
    yield put(toastrActions.add({ type: 'error', title: 'Something went wrong!', message }));
    yield put(actionCreators.getCurrencyExchangeFailure(message));
  }
}
