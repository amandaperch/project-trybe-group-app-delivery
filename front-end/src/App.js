import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Products from './pages/products';
import Register from './pages/register';
import Checkout from './pages/checkout';
import OrdersDetails from './pages/orderDetails';
import OrdersDetailsSeller from './pages/orderDetailsSeller';
import SellerOrders from './pages/sellerOrders';
import Orders from './pages/orders';

export default function App() {
  return (
    <div>
      <Switch>
        <Route path="/login" component={ Login } />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/customer/products" component={ Products } />
        <Route path="/customer/checkout" component={ Checkout } />
        <Route path="/customer/orders/" component={ Orders } />
        <Route path="/customer/orders/:id" component={ OrdersDetails } />
        <Route path="/seller/orders/:id" component={ OrdersDetailsSeller } />
        <Route path="/seller/orders" component={ SellerOrders } />
        <Route path="/register" component={ Register } />
      </Switch>
    </div>
  );
}
