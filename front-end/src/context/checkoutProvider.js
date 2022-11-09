import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import CheckoutContext from './checkoutContext';

function CheckoutProvider({ children }) {
  const [itemsList, setItemsList] = useState([]);
  useEffect(() => {
    async function getCart() {
      try {
        if (localStorage.getItem('carrinho') === null) {
          localStorage.setItem('carrinho', JSON.stringify([]));
        } else {
          setItemsList(JSON.parse(localStorage.getItem('carrinho')));
        }
      } catch (error) {
        console.log(error);
      }
    }
    getCart();
    console.log('Item List no use do Provider', itemsList);
  }, []);

  const total = itemsList.reduce((acc, item) => {
    const total = acc + (item.quantity * item.value);
    return total;
  }, 0);

  const totalPrice = total.toFixed(2);

  console.log('ITEMLIST: ', itemsList);
  console.log('TOTAL: ', totalPrice);

  const contextValue = useMemo(() => ({
    itemsList,
    totalPrice,
  }), [itemsList, totalPrice]);

  return (
    <CheckoutContext.Provider value={ contextValue }>
      {children}
    </CheckoutContext.Provider>
  );
}

CheckoutProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CheckoutProvider;
