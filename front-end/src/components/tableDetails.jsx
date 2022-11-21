import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { getSaleByPk, updateOrder } from '../helpers/api';

export default function TableDetails() {
  const [itemsList, setItemList] = useState([]);
  const [user, setUser] = useState('');
  const [saleData, setSaleData] = useState({});
  const tableTitles = ['Item', 'Descrição', 'Quantidade',
    'Valor Unitário', 'Sub-total'];
  const { id } = useParams();

  const getUser = () => {
    try {
      if (localStorage.getItem('user') === null) {
        localStorage.setItem('user', JSON.stringify({}));
      } else {
        setUser(JSON.parse(localStorage.getItem('user')));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getSale() {
      try {
        const { data } = await getSaleByPk(id, user.token);
        setSaleData(data);
        console.log('DATA DETAIL: ', data);
        setItemList(data.products);
      } catch (error) {
        console.log(error);
      }
    }
    getSale();
    getUser();
  }, []);

  const totalPrice = itemsList.reduce((acc, item) => {
    const sumTotal = acc + (item.SaleProduct.quantity * item.price);
    return sumTotal;
  }, 0);

  const dataSeller = 'customer_order_details__element-order-details-label-seller-name';
  const dataDate = 'customer_order_details__element-order-details-label-order-date';
  const dataStat = 'customer_order_details__element-order-details-label-delivery-status';
  // const dataButt = 'customer_order_details__button-delivery-check';

  console.log('TOTAL PRICE NA TABLE DETAILS: ', totalPrice);
  return (
    itemsList.length < 1 ? (<p>CARRINHO VAZIO</p>)
      : (
        <div>
          <header>
            <p>
              <span
                data-testid="customer_order_details__element-order-details-label-order-id"
              >
                {`PEDIDO ${id}; `}

              </span>
              <span
                data-testid={ dataSeller }
              >
                {`P. Vend: ${saleData.sellers.name} `}
              </span>
              <span data-testid={ dataDate }>
                { moment(saleData.saleDate).format('DD/MM/YYYY')}
              </span>
              <span
                data-testid={ dataStat }
              >
                {saleData.status}
              </span>
              <button
                type="button"
                data-tesid="customer_order_details__button-delivery-check"
                disabled={ saleData.status !== 'Preparando' }
                onClick={ async () => {
                  await updateOrder({ saleId: id, newStatus: 'Entregue' });
                } }
              >
                MARCAR COMO ENTREGUE
              </button>
            </p>
          </header>
          <table>
            <thead>
              <tr>
                {tableTitles.map((title) => (
                  <th key={ title }>{title}</th>
                ))}

              </tr>
            </thead>
            {itemsList.map((item, index) => (
              <div key={ index }>
                <tr>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-item-number-${index}`
                    }
                  >
                    {index + 1}
                  </td>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-name-${index}`
                    }
                  >
                    {item.name}

                  </td>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-quantity-${index}`
                    }
                  >
                    {item.SaleProduct.quantity}

                  </td>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-unit-price-${index}`
                    }
                  >
                    { (Number(item.price).toFixed(2)).replace(/\./, ',') }

                  </td>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-sub-total-${index}`
                    }
                  >
                    { ((item.SaleProduct.quantity * item.price).toFixed(2))
                      .replace(/\./, ',') }

                  </td>
                </tr>
              </div>
            ))}
          </table>
          <p data-testid="customer_order_details__element-order-total-price">
            Total: R$
            {' '}
            <span>{ totalPrice.toFixed(2).toString().replace(/\./, ',') }</span>
          </p>
        </div>
      )
  );
}
