import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/navbar';
import CardProduct from '../components/cardProduct';
import api, { tokenUser } from '../helpers/api';

export default function Products() {
  const [card, setCard] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function getCard() {
      try {
        const res = await api.get('/products');
        const newCart = res.data.map((product) => ({ quantity: 0, ...product }));
        setCart(newCart);
        setCard(res.data);
        localStorage.setItem('carrinho', JSON.stringify(res.data));
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
        if (!tokenUser || tokenUser === false) {
          console.log(errorMessage);
          return errorMessage;
        }
      } catch (error) {
        console.log(error);
      }
    }
    getCard();
  }, []);

  const totalCart = () => {
    cart.forEach((quantity) => {
      const cartTotal = quantity * cart.price;
      return cartTotal;
    });
  };

  const history = useHistory();

  return (
    <>
      <NavBar />
      <main>
        {card.map((value) => (
          <CardProduct key={ value.id } value={ value } />
        ))}
      </main>
      <button
        type="button"
        data-testid="customer_products__checkout-bottom-value"
        onClick={ () => history.push('/customer/checkout') }
      >
        `Ver Carrinho: R$
        {totalCart}
        `
      </button>
    </>

  );
}
