import React, { useState, useEffect } from 'react';
import { getAllSellers } from '../helpers/api';

export default function DeliveryAdressForm() {
  const [address, setAddress] = useState('');
  const [numberAddress, setNumberAddress] = useState('');
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState('');

  useEffect(() => {
    async function getSellerName() {
      try {
        const { data } = await getAllSellers();
        console.log('DATA: ', data[0].name);
        setSellers(data);
      } catch (error) {
        console.log(error);
      }
    }
    getSellerName();
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
            {sellers.map(({ name }, index) => (
              <option key={ index } value={ name }>{ name }</option>
            ))}
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
            value={ address }
            onChange={ ({ target: { value } }) => setAddress(value) }
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
            value={ numberAddress }
            onChange={ ({ target: { value } }) => setNumberAddress(value) }
            id="numberAddress"
          />
        </label>
        <button
          className="loginBtn"
          type="submit"
          onClick=""
          disabled=""
          data-testid="customer_checkout__button-submit-order"
        >
          FINALIZAR PEDIDO
        </button>
      </form>
    </div>
  );
}
