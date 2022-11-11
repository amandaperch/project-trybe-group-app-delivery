import React from 'react';
import NavBar from '../components/navbar';
import TableDetails from '../components/tableDetails';

export default function OrdersDetails() {
  return (
    <>
      <main>
        <NavBar />
      </main>
      <h3>Detalhe do Pedido</h3>
      <TableDetails />
    </>

  );
}
