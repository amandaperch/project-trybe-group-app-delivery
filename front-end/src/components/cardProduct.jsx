import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function CardProduct({ value }) {
  const [valuePrice, setValuePrice] = useState(0);

  return (
    <div>
      <div
        key={ value.id }
      >
        <p
          data-testid={ `customer_products__element-card-title-${value.id}` }
        >
          {value.name}
        </p>
        <p
          data-testid={ `customer_products__element-card-price-${value.id}` }
        >
          {value.price.replace(/\./, ',')}
        </p>
        <img
          width="200px"
          src={ value.urlImage }
          alt={ value.name }
          data-testid={ `customer_products__img-card-bg-image-${value.id}` }
        />
        <div>
          <button
            type="button"
            data-testid={ `customer_products__button-card-rm-item-${value.id}` }
            onClick={ () => setValuePrice(valuePrice > 0 ? valuePrice - 1 : 0) }
          >
            -
          </button>
          <label htmlFor="qte">
            <input
              type="number"
              value={ valuePrice }
              onChange={ (({ target: { v } }) => setValuePrice(v)) }
              min={ 0 }
              data-testid={ `customer_products__input-card-quantity-${value.id}` }
            />
          </label>
          <button
            type="button"
            data-testid={ `customer_products__button-card-add-item-${value.id}` }
            onClick={ () => setValuePrice(valuePrice + 1) }
          >
            +
          </button>
        </div>

      </div>
    </div>
  );
}

CardProduct.propTypes = {
  value: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
  }).isRequired,

};
