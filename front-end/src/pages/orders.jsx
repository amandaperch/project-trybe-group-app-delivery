import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import api from '../helpers/api';
import NavBar from '../components/navbar';

export default function Orders() {
  const [sales, setSales] = useState([]);
  // const { Userid } = useParams();

  useEffect(() => {
    async function getSales() {
      try {
        const { data } = await api.get('/saleAll');
        setSales(data);
      } catch (error) {
        console.log(error);
      }
    }
    getSales();
  }, []);

  return (
    <>
      <main>
        <NavBar />
      </main>
      <div>
        {sales.map((order) => (
          <div
            key={ order.id }
          >
            <Link
              to={ `/customer/orders/${order.id}` }
            >
              <span data-testid={ `customer_orders__element-order-id-${order.id}` }>
                {
                  `Pedido ${order.id}`
                }
              </span>
              <span
                data-testid={ `customer_orders__element-delivery-status-${order.id}` }
              >
                {
                  order.status
                }
              </span>
              <span data-testid={ `customer_orders__element-order-date-${order.id}` }>
                {
                  moment(order.saleDate).format('DD/MM/YYYY')
                }
              </span>
              <span data-testid={ `customer_orders__element-card-price-${order.id}` }>
                {
                  `R$ ${order.totalPrice.replace('.', ',')}`
                }
              </span>
            </Link>
          </div>
        ))}
      </div>
    </>

  );
}
