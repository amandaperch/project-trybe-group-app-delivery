import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSaleByPk } from '../helpers/api';

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

  console.log('TOTAL PRICE NA TABLE DETAILS: ', totalPrice);
  return (
    itemsList.length < 1 ? (<p>CARRINHO VAZIO</p>)
      : (
        <div>
          <header>
            <p>
              <span
                datatestid="customer_order_details__element-order-details-label-order-id"
              >
                {`PEDIDO ${id}; `}

              </span>
              <span
                datatestid={ dataSeller }
              >
                {`P. Vend: ${saleData.sellers.name} `}
              </span>
              <span
                datatestid={ dataDate }
              >
                <span>{`${saleData.saleDate.split('T')[0].split('-')[2]}/`}</span>
                <span>{`${saleData.saleDate.split('T')[0].split('-')[1]}/`}</span>
                <span>
                  {saleData.saleDate.split('T')[0].split('-')[0]}
                  {' '}
                </span>
              </span>
              <span
                datatestid={
                  `customer_order_details__element-order-details-label
                  -delivery-status${id}`
                }
              >
                {saleData.status.toUpperCase()}
                {' '}
              </span>
              <button
                datatestid="customer_order_details__button-delivery-check"
                type="button"
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
              <tr key={ index }>
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
