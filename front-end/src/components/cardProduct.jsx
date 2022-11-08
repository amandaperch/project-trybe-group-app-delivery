import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function CardProduct({ value }) {
  const [quantity, setQuantity] = useState(0);
  const [localStorangeCart, setLocalStorangeCart] = useState([]);
  const { id, name, price } = value;
  useEffect(() => {
    async function localStorangeExists() {
      try {
        if (localStorage.getItem('carrinho') === null) {
          localStorage.setItem('carrinho', JSON.stringify([]));
        } else {
          setLocalStorangeCart(JSON.parse(localStorage.getItem('carrinho')));
        }
      } catch (error) {
        console.log(error);
      }
    }
    localStorangeExists();
  }, []);
  const remove = () => {
    setQuantity((prev) => {
      if (prev > 0) return prev - 1;
      return prev;
    });
    const cart = JSON.parse(localStorage.getItem('carrinho'));
    if (cart.find((item) => item.id === id)) {
      const newCart = cart.map((item) => {
        if (item.id === id && item.quantity > 0) {
          return { ...item,
            quantity: item.quantity - 1,
            subTotal: Number((Number(item.subTotal) - Number(price)).toFixed(2)) };
        }
        return item;
      });
      localStorage.setItem('carrinho', JSON.stringify(newCart));
    }
  };
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('carrinho')) || [];
    const product = { id, name, price, quantity: 1, subTotal: Number(price) };
    if (cart.find((item) => item.id === id)) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item,
            quantity: Number(item.quantity) + 1,
            subTotal: Number((Number(item.subTotal) + Number(price)).toFixed(2)) };
        }
        return item;
      });
      localStorage.setItem('carrinho', JSON
        .stringify(newCart), localStorangeCart
        .push(newCart));
    } else {
      cart.push(product);
      localStorage.setItem('carrinho', JSON.stringify(cart));
    }
  };
  const handleQuantity = ({ target }) => {
    setQuantity(target.value);
    const product = { id, name, price, subTotal: Number(price) };
    const itemThere = product.some((item) => item.id === id);
    if (itemThere) {
      const newCart = product.filter((item) => item.id !== id);
      localStorage.setItem('carrinho', newCart);
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
              value={ quantity }
              onChange={ (e) => handleQuantity(e) }
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
};
