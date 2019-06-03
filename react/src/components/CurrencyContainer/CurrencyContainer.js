import React from 'react';
import PropTypes from 'prop-types';
import { AtomSpinner } from 'react-epic-spinners';
import CurrencyItem from '../CurrencyItem';
import styles from './CurrencyContainer.module.scss';

const CurrencyContainer = ({ data }) => {
  return data ? (
    <div className={styles.container}>
      {data.map((crypto, index) => {
        return <CurrencyItem key={index} {...crypto} />;
      })}
    </div>
  ) : (
    <AtomSpinner style={{ margin: '0 auto' }} size="100" color="#87c258" />
  );
};

CurrencyContainer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string,
      quotes: PropTypes.array.isRequired
    })
  ).isRequired
};

export default CurrencyContainer;
