import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwt from 'jwt-decode';
import { createUser } from '../helpers/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const minLengthName = 11;
  const minLengthPass = 5;
  const regex = /\S+@\S+\.\S+/;
  return (
    <main>
      <form>
        <div>
          <input
            className="inputLogin"
            placeholder="Nome"
            data-testid="common_register__input-name"
            type="text"
            name="name"
            value={ name }
            onChange={ ({ target: { value } }) => setName(value) }
            id="register_name"
          />
          <input
            className="inputLogin"
            placeholder="Email"
            data-testid="common_register__input-email"
            type="email"
            name="email"
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
            id="register_email"
          />
          <input
            className="inputLogin"
            placeholder="senha"
            data-testid="common_register__input-password"
            type="password"
            name="password"
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
            id="register_password"
          />
          <button
            className="loginBtn"
            type="submit"
            onClick={ (
              async (e) => {
                e.preventDefault();
                const response = await createUser({ name, email, password });
                const user = jwt(response.data).data;
                localStorage.setItem('user', JSON.stringify(user));
                // const { data } = response;
                // localStorage.setItem('user', JSON.stringify(data));
                if ('message' in response) {
                  setErrorMessage(response.message);
                  return null;
                }
                history.push('/customer/products');
              }
            ) }
            disabled={ !(name.length > minLengthName
              && password.length > minLengthPass && regex.test(email)) }
            data-testid="common_register__button-register"
          >
            Cadastrar
          </button>
        </div>
      </form>
      {errorMessage
        && (
          <p data-testid="common_register__element-invalid_register">
            {errorMessage}
          </p>)}
    </main>

  );
}
