import React, { useEffect } from 'react';
import NavBar from '../components/navbar';
import CardProduct from '../components/cardProduct';
import { tokenUser } from '../helpers/api';

export default function Products() {
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

  return (
    <>
      <NavBar />
      <main>
        <CardProduct />
      </main>
    </>

  );
}
