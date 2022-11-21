import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSalesBySeller } from '../helpers/api';
import NavBar from '../components/navbar';

export default function SellerOrders() {
  const [seller, setSeller] = useState({});
  const [sales, setSales] = useState([]);

  useEffect(() => {
    function getSeller() {
      try {
        if (localStorage.getItem('user') === null) {
          localStorage.setItem('user', JSON.stringify({}));
        } else {
          setSeller(JSON.parse(localStorage.getItem('user')));
        }
      } catch (error) {
        console.log(error);
      }
    }

    getSeller();
  }, []);

  useEffect(() => {
    async function getSales() {
      try {
        if (seller.id) {
          console.log('SELLERID', seller.id);

          const { data } = await getSalesBySeller({
            sellerId: seller.id,
            token: seller.token,
          });

          console.log('DATA NA SELLER ORDERS', data);
          setSales(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getSales();
  }, [seller.id, seller.token]);

  return (
    <>
      <main>
        <NavBar />
      </main>
      <div>
        {sales.map((item) => (
          <div key={ item.id }>
            <Link to={ `/seller/orders/${item.id}` }>
              <p data-testid={ `seller_orders__element-order-id-${item.id}` }>
                {
                  item.id
                }
              </p>
              <p data-testid={ `seller_orders__element-delivery-status-${item.id}` }>
                {
                  item.status
                }
              </p>
              <p data-tesid={ `seller_orders__element-order-date-${item.id}` }>
                {
                  item.saleDate
                }
              </p>
              <p data-tesid={ `seller_orders__element-card-price-${item.id}` }>
                {
                  item.totalPrice
                }
              </p>
            </Link>
          </div>
        ))}
      </div>
    </>

  );
}
