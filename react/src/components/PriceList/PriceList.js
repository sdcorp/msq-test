import React from 'react';
import PropTypes from 'prop-types';
import styles from './PriceList.module.scss';

const PriceList = ({ data }) => {
  return (
    <ul className={styles.price_list}>
      {data.map((item, index) => {
        const [currency, price] = Object.entries(item)[0];
        return (
          <li key={index}>
            <div className={styles.currency}>{currency}:</div>
            <div className={styles.price}>{price.toFixed(2)}</div>
          </li>
        );
      })}
    </ul>
  );
};

PriceList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default PriceList;
