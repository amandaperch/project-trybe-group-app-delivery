import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Products from './pages/products';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={ Login } />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/customer/products" component={ Products } />
      </Switch>
    </div>
  );
}
