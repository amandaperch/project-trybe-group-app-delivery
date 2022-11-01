import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const name = 'nome';
  return (
    <header>
      <div>
        <Link
          to="/customer/products" // alterar rota
          data-testid="customer_products__element-navbar-link-products"
        >
          <h2> PRODUTOS </h2>
        </Link>
        <Link
          to="/customer/orders" // alterar rota
          data-testid="customer_products__element-navbar-link-orders"
        >
          <h2> MEUS PEDIDOS </h2>
        </Link>
        <p
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { name }
        </p>
        <Link
          to="/" // alterar rota
          data-testid="customer_products__element-navbar-link-logout"
        >
          Sair
        </Link>
      </div>
    </header>
  );
}
