import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectCrypto, getCurrencyExchangeTriggered } from '../../redux/actions';
import { getCryptoIconPath } from '../../services/utils';
import PriceList from '../PriceList';
import styles from './CurrencyItem.module.scss';

const CurrencyItem = ({
  symbol,
  quotes,
  selectCrypto,
  selectedCrypto,
  selectedCurrency,
  getCurrencyExchangeTriggered
}) => {
  return (
    <div
      className={`${styles.container} ${symbol === selectedCrypto ? styles.is_active : undefined}`}
      onClick={() => {
        selectCrypto(symbol);
        getCurrencyExchangeTriggered({ crypto: symbol, currency: selectedCurrency });
      }}
    >
      <div className={styles.image}>
        <img src={getCryptoIconPath(symbol)} alt={symbol} />
        <p>{symbol}</p>
      </div>
      <PriceList data={quotes} />
    </div>
  );
};

CurrencyItem.propTypes = {
  symbol: PropTypes.string,
  quotes: PropTypes.array
};

const mapStateToProps = state => ({
  selectedCrypto: state.exchangeData.selectedCrypto,
  selectedCurrency: state.exchangeData.selectedCurrency
});

const mapDispatchToProps = dispatch => bindActionCreators({ selectCrypto, getCurrencyExchangeTriggered }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyItem);
