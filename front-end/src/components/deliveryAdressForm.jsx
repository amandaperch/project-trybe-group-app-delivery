import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CheckoutContext from '../context/checkoutContext';
import { getAllSellers, createSale } from '../helpers/api';

export default function DeliveryAdressForm() {
  const { itemsList, totalPrice } = useContext(CheckoutContext);
  const history = useHistory;
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [sellers, setSellers] = useState([]);
  const [user, setUser] = useState({});
  const [selectedSeller, setSelectedSeller] = useState('');

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
    async function getSellerName() {
      try {
        const { data } = await getAllSellers();
        console.log('DATA: ', data[0].name);
        setSellers(data);
        setSelectedSeller(data[0].id);
      } catch (error) {
        console.log(error);
      }
    }
    getSellerName();
    getUser();
  }, []);

  return (
    <div>
      <h3>Detalhes e Endereço para Entrega</h3>
      <form>
        <label htmlFor="tags" className="lbl">
          P.Vendedora Responsável:
          <select
            name="sellers"
            data-testid="customer_checkout__select-seller"
            id="tags"
            value={ selectedSeller }
            onChange={ (e) => setSelectedSeller(e.target.value) }
          >
            {
              sellers.map(({ id, name }, index) => (
                <option key={ index } value={ id }>{ name }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="address" className="lbl">
          Endereço
          <input
            className="inputLogin"
            placeholder="Endereço"
            data-testid="customer_checkout__input-address"
            type="text"
            name="address"
            value={ deliveryAddress }
            onChange={ ({ target: { value } }) => setDeliveryAddress(value) }
            id="address"
          />
        </label>
        <label htmlFor="numberAddress" className="lbl">
          Número:
          <input
            className="inputLogin"
            placeholder="Número"
            data-testid="customer_checkout__input-address-number"
            type="text"
            name="address-number"
            value={ addressNumber }
            onChange={ ({ target: { value } }) => setAddressNumber(value) }
            id="numberAddress"
          />
        </label>
        <button
          className="loginBtn"
          type="submit"
          disabled=""
          data-testid="customer_checkout__button-submit-order"
          onClick={ (
            async (e) => {
              e.preventDefault();
              const response = await createSale({ totalPrice,
                deliveryAddress,
                addressNumber,
                saleDate: Date(),
                status: 'pendente',
                userId: user.id,
                sellerId: selectedSeller,
                itemsList });
              const { data } = response;
              console.log('RESPONSE.DATA', data);
              if ('message' in response) {
                setErrorMessage(response.message);
                return null;
              }
              history.push('/customer/orders');
            }
          ) }
        >
          FINALIZAR PEDIDO
        </button>
      </form>
    </div>
  );
}
