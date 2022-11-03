import React, { useState, useEffect } from 'react';
import api from '../helpers/api';

export default function CardProduct() {
  const [card, setCard] = useState([]);

  useEffect(() => {
    async function getCard() {
      try {
        const res = await api.get('/products');
        setCard(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCard();
  }, []);

  return (
    <div>
      {card.map((value) => (
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
          <button
            type="button"
            data-testid={ `customer_products__button-card-add-item-${value.id}` }
          >
            Adicionar
          </button>
          <label htmlFor="qte">
            <input
              type="number"
              name="qte"
              id="qte"
              min={ 0 }
              data-testid={ `customer_products__input-card-quantity-${value.id}` }
            />
          </label>
          <button
            type="button"
            data-testid={ `customer_products__button-card-rm-item-${value.id}` }
          >
            Remover
          </button>
        </div>
      ))}
    </div>
  );
}
