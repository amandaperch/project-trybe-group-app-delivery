import api from '../helpers/api';
import NavBar from '../components/navbar';

export default function Orders() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    async function getSales() {
      try {
        const res = await api.get('/sales');
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
            <p data-testid={ `customer_orders__element-order-id-${item.id}` }>
              {
                item.pedido
              }
            </p>
            <p data-testid={ `customer_orders__element-delivery-status-${item.id}` }>
              {
                item.status
              }
            </p>
            <p data-tesid={ `customer_orders__element-order-date-${item.id}` }>
              {
                item.date
              }
            </p>
            <p data-tesid={ `customer_orders__element-card-price-${item.id}` }>
              {
                item.price
              }
            </p>
          </div>
        ))}
      </div>
    </>

  );
}
