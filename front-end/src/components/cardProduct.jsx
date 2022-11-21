import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function CardProduct({ value, state }) {
  const [quantity, setQuantity] = useState(0);
  const { id, name, price } = value;
  const [cartState, setCartState] = state;

  const remove = () => {
    setQuantity((prev) => {
      if (prev > 0) return prev - 1;
      return prev;
    });
    if (cartState.find((item) => item.id === id)) {
      const newCart = cartState.map((item) => {
        if (item.id === id && item.quantity > 0) {
          return { ...item,
            quantity: item.quantity - 1,
            subTotal: Number((Number(item.subTotal) - Number(price)).toFixed(2)) };
        }
        return item;
      });
      const newList = newCart.filter((item) => item.quantity > 0);
      localStorage.setItem('carrinho', JSON.stringify(newList));
      setCartState(newList);
    }
  };

  const typeQuantity = (qty) => {
    const product = { id,
      name,
      price,
      quantity: Number(qty),
      subTotal: Number((qty * price).toFixed(2)) };
    if (cartState.find((item) => item.id === id)) {
      const newCart = cartState.map((item) => {
        if (item.id === id) {
          return { ...item,
            quantity: Number(qty),
            subTotal: Number((Number(item.price) * Number(qty)).toFixed(2)) };
        }
        return item;
      });
      const newList = newCart.filter((item) => item.quantity > 0);
      localStorage.setItem('carrinho', JSON.stringify(newList));
      setCartState(newList);
    } else {
      const newList = [...cartState, product].filter((item) => item.quantity > 0);
      setCartState(newList);
      localStorage.setItem('carrinho', JSON.stringify(newList));
    }
  };

  const addToCart = () => {
    const product = { id, name, price, quantity: 1, subTotal: Number(price) };
    if (cartState.find((item) => item.id === id)) {
      const newCart = cartState.map((item) => {
        if (item.id === id) {
          return { ...item,
            quantity: Number(item.quantity) + 1,
            subTotal: Number((Number(item.subTotal) + Number(price)).toFixed(2)) };
        }
        return item;
      });
      localStorage.setItem('carrinho', JSON
        .stringify(newCart));
      setCartState(newCart);
    } else {
      setCartState([...cartState, product]);
      localStorage.setItem('carrinho', JSON.stringify([...cartState, product]));
    }
  };

  return (
    <div>
      <div>
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
            onClick={ remove }
          >
            -
          </button>
          <label htmlFor="qte">
            <input
              type="number"
              placeholder="0"
              value={ quantity }
              onChange={ (e) => {
                setQuantity(Number(e.target.value));
                typeQuantity(e.target.value);
              } }
              min={ 0 }
              data-testid={ `customer_products__input-card-quantity-${value.id}` }
            />
          </label>
          <button
            type="button"
            data-testid={ `customer_products__button-card-add-item-${value.id}` }
            onClick={ () => { setQuantity((prev) => Number(prev) + 1); addToCart(); } }
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
    setSubtotalCart: PropTypes.number,
  }).isRequired,
  state: PropTypes.shape({
    cartState: PropTypes.arrayOf(PropTypes.shape({})),
    setCartState: PropTypes.func,
  }).isRequired,
};
