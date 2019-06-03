import React, { Component } from 'react';
import './App.scss';
// import Result from './components/Result/Result';
// import CurrencyContainer from './components/CurrencyContainer/CurrencyContainer';
import { getCurrencyExchangeByCryptoAPI } from '../../services/api';
import CurrencyContainer from '../CurrencyContainer';
import Result from '../Result';
import { mockData } from '../../services/utils';

class App extends Component {
  state = {
    data: null
  };
  // Load our initial data.
  // The reason of theese multiple requests is limitation of API (free plan)
  async componentDidMount() {
    const btcData = getCurrencyExchangeByCryptoAPI('BTC');
    const ethData = getCurrencyExchangeByCryptoAPI('ETH');
    const xrpData = getCurrencyExchangeByCryptoAPI('XRP');
    const data = await Promise.all([btcData, ethData, xrpData]);
    this.setState({ data });
  }

  render() {
    const { data } = this.state;

    return (
      <div className="App">
        <div className="container">
          <h1>Cryptocurrency Calculator</h1>
          <p className="warning">* The app can't handle a lot of requests (API limitation)</p>
          <CurrencyContainer data={data || mockData} />
          <Result />
        </div>
      </div>
    );
  }
}

export default App;
