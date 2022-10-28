import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const regex = /\S+@\S+\.\S+/;
  const minLengthPass = 5;
  return (
    <main>
      <form>
        <div>
          <h1>Oi, eu sou o form!</h1>
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
            onClick=""
            disabled={ !(password.length > minLengthPass && regex.test(email)) }
            data-testid="common_login__button-login"
          >
            Login
          </button>
          <button
            className="loginBtn"
            type="submit"
            onClick=""
            disabled=""
            data-testid="common_login__button-register"
          >
            Ainda não tenho conta
          </button>
        </div>
      </form>
      <p data-testid="common_login__element-invalid-email">
        Elemento oculto (Mensagens de erro)
      </p>
    </main>

  );
}
