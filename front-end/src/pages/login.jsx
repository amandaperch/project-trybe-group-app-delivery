import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginUser, tokenUser } from '../helpers/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const regex = /\S+@\S+\.\S+/;
  const minLengthPass = 5;
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
                console.log(response);
                localStorage.setItem('user', JSON.stringify(response.data));
                if ('message' in response) {
                  setErrorMessage(response.message);
                  return null;
                }
                const localUser = localStorage.getItem('user');
                console.log('localUser', localUser);
                const userToken = JSON.parse(localUser);
                console.log('userToken', userToken);
                tokenUser(localStorage.getItem(userToken.token));
                if (!tokenUser || tokenUser === false) {
                  console.log(errorMessage);
                  return errorMessage;
                }
                history.push('/customer/products');
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
