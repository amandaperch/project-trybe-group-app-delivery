import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/navbar';
import CardProduct from '../components/cardProduct';
import api from '../helpers/api';

export default function Products() {
  const [card, setCard] = useState([]);
  // const [subtotalCart, setSubtotalCart] = useState(0);
  const [cartState, setCartState] = useState([]);

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

  useEffect(() => {
    async function getCard() {
      try {
        const localUser = localStorage.getItem('user');
        console.log('localUser', localUser);
        const userObject = JSON.parse(localUser);
        console.log('userToken', userObject);
        tokenUser(localStorage.getItem(userObject.token));
        // if (!tokenUser || tokenUser === false) {
        //   console.log(errorMessage);
        //   return errorMessage;
        // }
      } catch (error) {
        console.log(error);
      }
    }
    getCard();
  }, []);

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('carrinho') === null) {
      localStorage.setItem('carrinho', JSON.stringify([]));
    }
  }, []);

  function allPrice() {
    const totalPrice = cartState
      .reduce((acc, curr) => (acc) + (curr.subTotal), 0);
    return totalPrice;
  }

  return (
    <>
      <NavBar />
      <main>
        {card.map((value) => (
          <CardProduct
            key={ value.id }
            value={ value }
            state={ [cartState, setCartState] }
          />
        ))}
      </main>
      <button
        type="button"
        onClick={ () => history.push('/customer/checkout') }
        disabled={ allPrice() === 0 }
        data-testid="customer_products__button-cart"
      >
        <p data-testid="customer_products__checkout-bottom-value">
          {allPrice().toFixed(2).replace(/\./, ',')}
        </p>
      </button>
    </>
  );
}
