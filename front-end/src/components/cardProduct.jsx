import React, { useState, useEffect, useHistory } from 'react';
import api from '../helpers/api';

export default function CardProduct() {
  const [card, setCard] = useState([]);
  const [valuePrice, setValuePrice] = useState(0);
  // const [quantity, setquantity] = useState(0);

  // async function handleClick() {
  //   async (e) => {
  //     const add = quantity + 1;
  //     localStorage.setItem('carrinho', JSON.stringify(add));
  // }

  const history = useHistory();

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
            // onClick={ (e) => {
            //   e.preventDefault();
            //   handleClick();
            // } }
          >
            Adicionar
          </button>
          <label htmlFor="qte">
            <input
              type="number"
              name="qte"
              id="qte"
              value={ valuePrice }
              onChange={ ({ target: { v } }) => setValuePrice(v) }
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
          <button
            type="button"
            data-testid="customer_products__checkout-bottom-value"
            onClick={ () => history.push('/customer/checkout') }
          >
            Ver Carrinho
          </button>
        </div>
      ))}
    </div>
  );
}
