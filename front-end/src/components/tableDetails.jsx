import React, { useState, useEffect } from 'react';
import { getSaleByPk } from '../helpers/api';

export default function TableDetails() {
  const [itemsList, setItemList] = useState([]);
  const [totalPrice] = useState('');
  const [user, setUser] = useState('');
  const tableTitles = ['Item', 'Descrição', 'Quantidade',
    'Valor Unitário', 'Sub-total', 'Remover Item'];

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
        setItemList(data.products);
        setSelectedSeller(data[0].id);
      } catch (error) {
        console.log(error);
      }
    }
    getSale();
    getUser();
  }, []);

  console.log('ITEM LIST NO TABLE: ', itemsList);
  console.log('TOTAL PRICE NA TABLE: ', totalPrice);
  return (
    itemsList.length < 1 ? (<p>CARRINHO VAZIO</p>)
      : (
        <div>
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
                    `customer_checkout__element-order-table-item-number-${index}`
                  }
                >
                  {index + 1}
                </td>
                <td
                  data-testid={ `customer_checkout__element-order-table-name-${index}` }
                >
                  {item.name}

                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${index}`
                  }
                >
                  {item.quantity}

                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-unit-price-${index}`
                  }
                >
                  { (Number(item.price).toFixed(2)).replace(/\./, ',') }

                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                >
                  { ((item.quantity * item.price).toFixed(2)).replace(/\./, ',') }

                </td>
              </tr>
            ))}
          </table>
          <p data-testid="customer_checkout__element-order-total-price">
            Total:
            {' '}
            <span>{ totalPrice.replace(/\./, ',') }</span>
          </p>
        </div>
      )
  );
}
