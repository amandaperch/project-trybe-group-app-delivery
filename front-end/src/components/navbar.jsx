import React from 'react';
import { Link } from 'react-router-dom';
// import api from '../helpers/api';

export default function NavBar() {
  const user = localStorage.getItem('user');
  const parsed = JSON.parse(user);
  return (
    <header>
      <nav>
        <Link
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          <h2> PRODUTOS </h2>
        </Link>
        <Link
          to="/customer/orders"
          data-testid="customer_products__element-navbar-link-orders"
        >
          <h2> MEUS PEDIDOS </h2>
        </Link>
        <p
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { parsed.name }
        </p>
        <Link
          to="/"
          data-testid="customer_products__element-navbar-link-logout"
        >
          Sair
        </Link>
      </nav>
    </header>
  );
}
