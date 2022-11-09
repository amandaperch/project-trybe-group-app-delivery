import React, { useContext } from 'react';
import CheckoutContext from '../context/checkoutContext';

export default function TableCheckout() {
  const { itemsList, totalPrice } = useContext(CheckoutContext);
  const tableTitles = ['Item', 'Descrição', 'Quantidade',
    'Valor Unitário', 'Sub-total', 'Remover Item'];
  // if (itemsList.length === 0) {
  //   return null;
  // }
  console.log('ITEM LIST NO TABLE: ', itemsList);
  console.log('TOTAL PRICE NA TABLE: ', totalPrice);
  return (
    itemsList.length < 1 ? '...Carregando'
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
                  {Number(item.value).toFixed(2)}

                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                >
                  {item.quantity * item.value}

                </td>
                <td
                  data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                >
                  <button
                    type="button"
                    onClick=""
                    data-testid="delete-btn"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </table>
          <p data-testid="customer_checkout__element-order-total-price">
            Total:
            {' '}
            <span>{totalPrice}</span>
          </p>
        </div>
      )
  );
}
