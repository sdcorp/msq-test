import * as actionType from './constants';

const initialState = {
  selectedCrypto: 'BTC',
  selectedCurrency: 'USD',
  data: null,
  price: 0,
  loading: false,
  error: false,
  errorMessage: null
};

const getCurrencyExchangeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SELECT_CRYPTO:
      return { ...state, selectedCrypto: action.payload };

    case actionType.SELECT_CURRENCY:
      return { ...state, selectedCurrency: action.payload };

    case actionType.CURRENCY_EXCHANGE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      };
    case actionType.CURRENCY_EXCHANGE_SUCCESS:
      const exchangeData = action.payload;
      const { selectedCrypto, selectedCurrency } = state;
      const price = exchangeData[selectedCrypto].quote[selectedCurrency].price;
      return {
        ...state,
        data: action.payload,
        price,
        loading: false,
        error: false
      };
    case actionType.CURRENCY_EXCHANGE_FAILURE:
      return {
        ...state,
        data: [],
        loading: false,
        error: true,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};

export default getCurrencyExchangeReducer;
