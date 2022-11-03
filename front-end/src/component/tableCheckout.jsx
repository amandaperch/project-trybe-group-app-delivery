import React, { useState } from 'react';

export default function TableCheckout() {
  const [itemList, setItemList] = useState([]);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        {itemList.map((item, index) => (
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
              data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
            >
              {item.quantity}

            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
            >
              {Number(item.value).toFixed(2)}

            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
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
        Total
      </p>
    </div>
  );
}
