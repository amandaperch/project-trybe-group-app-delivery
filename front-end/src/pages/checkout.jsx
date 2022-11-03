import React from 'react';
// import { useHistory } from 'react-router-dom';
import TableCheckout from '../component/tableCheckout';
import DeliveryAdressForm from '../component/deliveryAdressForm';

export default function checkout() {
  return (
    <main>
      <h3>
        Finalizar pedido
      </h3>
      <TableCheckout />
      <DeliveryAdressForm />
    </main>
  );
}
