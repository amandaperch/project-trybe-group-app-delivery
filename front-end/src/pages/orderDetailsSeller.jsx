import React from 'react';
import NavBar from '../components/navbar';
import TableDetailsSeller from '../components/tabledetailsSeller';

export default function OrdersDetailsSeller() {
  return (
    <>
      <main>
        <NavBar />
      </main>
      <h3>Detalhe do Pedido</h3>
      <TableDetailsSeller />
    </>

  );
}
