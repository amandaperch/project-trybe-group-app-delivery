import React, { useState } from 'react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
            onClick=""
            disabled=""
            data-testid="common_register__button-register"
          >
            Cadastrar
          </button>
        </div>
      </form>
      {/* {errorMessage
        && (
          <p data-testid="common_register__element-invalid_register">
            {errorMessage}
          </p>)} */}
    </main>

  );
}
