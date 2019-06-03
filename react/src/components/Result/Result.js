import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HollowDotsSpinner } from 'react-epic-spinners';
import { selectCurrency, getCurrencyExchangeTriggered } from '../../redux/actions';
import styles from './Result.module.scss';

class Result extends Component {
  state = {
    inputValue: 1
  };

  componentDidMount() {
    const {
      getCurrencyExchangeTriggered,
      exchangeData: { selectedCrypto, selectedCurrency }
    } = this.props;
    getCurrencyExchangeTriggered({ crypto: selectedCrypto, currency: selectedCurrency });
  }
  // TODO Need validate input for only numbers
  handleInputChange = e => this.setState({ inputValue: e.target.value });

  handleCurrencyChange = currency => {
    const { selectCurrency, getCurrencyExchangeTriggered } = this.props;
    const { selectedCrypto } = this.props.exchangeData;
    selectCurrency(currency);
    getCurrencyExchangeTriggered({ crypto: selectedCrypto, currency });
  };

  render() {
    const { inputValue } = this.state;
    const { selectedCrypto, selectedCurrency, data, price, loading } = this.props.exchangeData;
    return (
      <div className={styles.result}>
        <h2>Selected coin: {selectedCrypto}</h2>
        <div>
          <div className={styles.input_group}>
            <input type="number" placeholder="Enter number" onChange={this.handleInputChange} value={inputValue} />
            <div className={styles.currency_selector}>
              <button
                className={selectedCurrency === 'USD' ? styles.is_active : undefined}
                onClick={() => this.handleCurrencyChange('USD')}
              >
                USD
              </button>
              <button
                className={selectedCurrency === 'UAH' ? styles.is_active : undefined}
                onClick={() => this.handleCurrencyChange('UAH')}
              >
                UAH
              </button>
              <button
                className={selectedCurrency === 'RUB' ? styles.is_active : undefined}
                onClick={() => this.handleCurrencyChange('RUB')}
              >
                RUB
              </button>
            </div>
          </div>
        </div>
        <div className={styles.converted}>
          {loading ? (
            <HollowDotsSpinner style={{ margin: '0 auto' }} size={30} color="#87c258" />
          ) : !data ? null : (
            <span>
              {selectedCrypto} will be {inputValue * price.toFixed(2)} in {selectedCurrency}
            </span>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({ exchangeData: state.exchangeData });

const mapDispatchToProps = dispatch => bindActionCreators({ selectCurrency, getCurrencyExchangeTriggered }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Result);
