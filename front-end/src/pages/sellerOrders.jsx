import React from 'react';
import { Link } from 'react-router-dom';
import api from '../helpers/api';
import NavBar from '../components/navbar';

export default function SellerOrders() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    async function getSales() {
      try {
        const res = await api.get('/salesAll');
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
          <div key={ item.id }>
            <Link to={ `/customer/orders/${item.id}` }>
              <p data-testid={ `customer_orders__element-order-id-${item.id}` }>
                {
                  item.id
                }
              </p>
              <p data-testid={ `customer_orders__element-delivery-status-${item.id}` }>
                {
                  item.status
                }
              </p>
              <p data-tesid={ `customer_orders__element-order-date-${item.id}` }>
                {
                  item.saleDate
                }
              </p>
              <p data-tesid={ `customer_orders__element-card-price-${item.id}` }>
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
