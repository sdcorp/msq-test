import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import ReduxToastr, { reducer as toastrReducer } from 'react-redux-toastr';
import 'normalize.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import App from './components/App';
import getCurrencyExchangeReducer from './redux/reducers';
import rootSaga from './redux/sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({ serialize: true });

const rootReducer = combineReducers({
  exchangeData: getCurrencyExchangeReducer,
  toastr: toastrReducer // For nice user-friendly notifications
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <ReduxToastr
        timeOut={2500}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        closeOnToastrClick
      />
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
);
