import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSaleByPk, updateOrder } from '../helpers/api';

export default function TableDetailsSeller() {
  const [itemsList, setItemList] = useState([]);
  const [user, setUser] = useState('');
  const [saleData, setSaleData] = useState({});
  // const [isDisabled, setIsDisabled] = useState(true);
  const tableTitles = ['Item', 'Descrição', 'Quantidade',
    'Valor Unitário', 'Sub-total'];
  const { id } = useParams();

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
    getSale();
    getUser();
  }, []);

  const totalPrice = itemsList.reduce((acc, item) => {
    const sumTotal = acc + (item.SaleProduct.quantity * item.price);
    return sumTotal;
  }, 0);

  const dataDate = 'seller_order_details__element-order-details-label-order-date';
  const dataStatus = 'seller_order_details__element-order-details-label-delivery-status';

  console.log('TOTAL PRICE NA TABLE DETAILS: ', totalPrice);
  return (
    itemsList.length < 1 ? (<p>CARRINHO VAZIO</p>)
      : (
        <div>
          <header>
            <p>
              <span
                data-testid="seller_order_details__element-order-details-label-order-id"
              >
                {`PEDIDO ${id} `}

              </span>
              <span
                data-testid={ dataDate }
              >
                <span>{`${saleData.saleDate.split('T')[0].split('-')[2]}/`}</span>
                <span>{`${saleData.saleDate.split('T')[0].split('-')[1]}/`}</span>
                <span>
                  {saleData.saleDate.split('T')[0].split('-')[0]}
                  {' '}
                </span>
              </span>
              <span
                data-testid={ dataStatus }

              >
                {saleData.status}
                {' '}
              </span>
              <button
                data-testid="seller_order_details__button-preparing-check"
                type="button"
                disabled={ saleData.status !== 'Pendente' }
                onClick={ async () => {
                  await updateOrder({ saleId: id, newStatus: 'Preparando' });
                  getSale();
                } }
              >
                PREPARAR PEDIDO
              </button>
              <button
                type="button"
                data-testid="seller_order_details__button-dispatch-check"
                disabled={ saleData.status !== 'Preparando' }
                onClick={ async () => {
                  await updateOrder({ saleId: id, newStatus: 'Em Trânsito' });
                  getSale();
                } }
              >
                SAIU PARA ENTREGA
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
                    `cseller_order_details__element-order-table-item-number-${index}`
                  }
                >
                  {index + 1}
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-name-${index}`
                  }
                >
                  {item.name}

                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-quantity-${index}`
                  }
                >
                  {item.SaleProduct.quantity}

                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-unit-price-${index}`
                  }
                >
                  { (Number(item.price).toFixed(2)).replace(/\./, ',') }

                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-sub-total-${index}`
                  }
                >
                  { ((item.SaleProduct.quantity * item.price).toFixed(2))
                    .replace(/\./, ',') }

                </td>
              </tr>
            ))}
          </table>
          <p data-testid="seller_order_details__element-order-total-price">
            Total: R$
            {' '}
            <span>{ totalPrice.toFixed(2).toString().replace(/\./, ',') }</span>
          </p>
        </div>
      )
  );
}
