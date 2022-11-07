import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/navbar';
import CardProduct from '../components/cardProduct';
import api, { tokenUser } from '../helpers/api';

export default function Products() {
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
        Ver Carrinho: valor do item mais price
      </button>
    </>

  );
}
