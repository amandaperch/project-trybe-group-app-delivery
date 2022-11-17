import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../helpers/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const [user, setUser] = useState({});

  const regex = /\S+@\S+\.\S+/;
  const minLengthPass = 5;

  const getRoute = (role) => {
    switch (role) {
    case 'seller':
      history.push('/seller/orders');
      break;
    case 'administrator':
      history.push('/administrator/products');
      break;
    default:
      history.push('/customer/products');
    }
  };

  useEffect(() => {
    const getUser = () => {
      try {
        if (localStorage.getItem('user') === null) {
          localStorage.setItem('user', JSON.stringify({}));
        } else {
          setUser(JSON.parse(localStorage.getItem('user')));
        }
        if (user.role) {
          getRoute(user.role);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <main>
      <form>
        <div>
          <input
            className="inputLogin"
            placeholder="Email"
            data-testid="common_login__input-email"
            type="email"
            name="email"
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
            id="login_email"
          />
          <input
            className="inputLogin"
            placeholder="Password"
            data-testid="common_login__input-password"
            type="password"
            name="password"
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
            id="login_password"
          />
          <button
            className="loginBtn"
            type="submit"
            onClick={ (
              async (e) => {
                e.preventDefault();
                const response = await loginUser({ email, password });
                const { data } = response;
                if (data !== undefined) {
                  console.log('RESPONSE.DATA', data);
                  console.log('ROLE FROM DATA:', data.role);
                  localStorage.setItem('user', JSON.stringify(data));
                }
                console.log('RESPONSE.MESSAGE', response.message);
                if ('message' in response || data === undefined) {
                  setErrorMessage(response.message);
                  return null;
                }
                if (data !== undefined) {
                  getRoute(data.role);
                }
                // if (userLocal) { history.push('/customer/products'); }
                // console.log('UserLocal linha76', userLocal);
                // history.push('/customer/products');
              }
            ) }
            disabled={ !(password.length > minLengthPass && regex.test(email)) }
            data-testid="common_login__button-login"
          >
            Login
          </button>
          <button
            className="loginBtn"
            type="submit"
            onClick={ () => history.push('/register') }
            disabled=""
            data-testid="common_login__button-register"
          >
            Ainda não tenho conta
          </button>
        </div>
      </form>
      {errorMessage
        && (
          <p data-testid="common_login__element-invalid-email">
            {errorMessage}
          </p>)}
    </main>

  );
}
