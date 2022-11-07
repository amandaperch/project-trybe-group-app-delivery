import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function CardProduct({ value }) {
  const [quantity, setQuantity] = useState(0);

  const addCart = () => {
    const add = quantity + 1;
    return setQuantity(add);
  };

  const removeCart = () => {
    const remove = quantity > 0 ? quantity - 1 : 0;
    return setQuantity(remove);
  };

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
            onClick={ removeCart }
          >
            -
          </button>
          <label htmlFor="qte">
            <input
              type="number"
              value={ quantity }
              onChange={ (({ target: { v } }) => setQuantity(v)) }
              min={ 0 }
              data-testid={ `customer_products__input-card-quantity-${value.id}` }
            />
          </label>
          <button
            type="button"
            data-testid={ `customer_products__button-card-add-item-${value.id}` }
            onClick={ addCart }
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
