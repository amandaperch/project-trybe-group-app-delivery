import React from 'react';
import NavBarSeller from '../components/navbarSeller';
import TableDetailsSeller from '../components/tabledetailsSeller';

export default function OrdersDetailsSeller() {
  return (
    <>
      <main>
        <NavBarSeller />
      </main>
      <h3>Detalhe do Pedido</h3>
      <TableDetailsSeller />
    </>

  );
}
