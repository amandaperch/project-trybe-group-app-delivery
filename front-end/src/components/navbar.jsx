import React from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function NavBar() {
  const user = localStorage.getItem('user');
  const parsed = JSON.parse(user);

  const history = useHistory();

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
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => {
            localStorage.clear('user');
            history.push('/');
          } }
        >
          Sair
        </button>
      </nav>
    </header>
  );
}
