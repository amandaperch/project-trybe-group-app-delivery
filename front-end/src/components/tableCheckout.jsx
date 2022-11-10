import React, { useContext } from 'react';
import CheckoutContext from '../context/checkoutContext';

export default function TableCheckout() {
  const { itemsList, totalPrice, removeItem } = useContext(CheckoutContext);
  const tableTitles = ['Item', 'Descrição', 'Quantidade',
    'Valor Unitário', 'Sub-total', 'Remover Item'];

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
                <td
                  data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                >
                  <button
                    type="button"
                    onClick={ () => removeItem(item.id) }
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
            <span>{ totalPrice.replace(/\./, ',') }</span>
          </p>
        </div>
      )
  );
}
