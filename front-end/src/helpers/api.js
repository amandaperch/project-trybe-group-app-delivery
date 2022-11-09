import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const loginUser = async ({ email, password }) => api
  .post('login', { email, password }).catch((error) => error.response.data);

export const createUser = async ({ name, email, password }) => api
  .post('register', { name, email, password }).catch((error) => error.response.data);


export const getAllSellers = async () => api
  .get('sellers').catch((error) => error.response.data);

export const createSale = async ({ totalPrice, deliveryAddress, deliveryNumber,
  userId, sellerId, itemsList,

}) => api.post('sale', { totalPrice,
  deliveryAddress,
  deliveryNumber,
  userId,
  sellerId,
  itemsList }, {}).catch((error) => error.response.data);

export const tokenUser = async (token) => api
  .post('token', {}, { headers: { Authorization: token } })
  .catch((error) => error.response.data);

export default api;
