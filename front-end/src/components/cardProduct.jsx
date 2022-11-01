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
            {value.price}
          </p>
          <img
            src={ value.urlImage }
            alt={ value.id }
            data-testid={ `customer_products__img-card-bg-image-${value.id}` }
          />
        </div>
      ))}
    </div>
  );
}
