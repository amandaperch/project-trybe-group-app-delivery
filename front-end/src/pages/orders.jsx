import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../helpers/api';
import NavBar from '../components/navbar';

export default function Orders() {
  const [sales, setSales] = useState([]);
  // const { Userid } = useParams();

  useEffect(() => {
    async function getSales() {
      try {
        const res = await api.get('/saleAll');
        setSales(res.data);
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
        {sales.map((item) => (
          <div
            key={ item.id }
          >
            <Link
              to={ `/customer/orders/${item.id}` }
            >
              <span data-testid={ `customer_orders__element-order-id-${item.saleId}` }>
                {
                  item.id
                }
              </span>
              <span
                data-testid={ `customer_orders__element
              -delivery-status-${item.saleId}` }
              >
                {
                  item.status
                }
              </span>
              <span data-tesid={ `customer_orders__element-order-date-${item.saleId}` }>
                <span>{`${item.saleDate.split('T')[0].split('-')[2]}/`}</span>
                <span>{`${item.saleDate.split('T')[0].split('-')[1]}/`}</span>
                <span>
                  {item.saleDate.split('T')[0].split('-')[0]}
                  {' '}
                </span>

                {
                  item.saleDate
                }
              </span>
              <span data-tesid={ `customer_orders__element-card-price-${item.saleId}` }>
                {
                  item.totalPrice
                }
              </span>
            </Link>
          </div>
        ))}
      </div>
    </>

  );
}
