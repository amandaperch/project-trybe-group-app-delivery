import React from 'react';
// import { useHistory } from 'react-router-dom';
import TableCheckout from '../components/tableCheckout';
import DeliveryAdressForm from '../components/deliveryAdressForm';
import NavBar from '../components/navbar';
import CheckoutProvider from '../context/checkoutProvider';

export default function checkout() {
  return (
    <CheckoutProvider>
      <main>
        <NavBar />
        <h3>
          Finalizar pedido
        </h3>
        <TableCheckout />
        <DeliveryAdressForm />
      </main>
    </CheckoutProvider>
  );
}
