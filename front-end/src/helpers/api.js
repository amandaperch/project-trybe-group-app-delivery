import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const loginUser = async ({ email, password }) => api
  .post('login', { email, password }).catch((error) => error.response.data);

export const createUser = async ({ name, email, password }) => api
  .post('register', { name, email, password }).catch((error) => error.response.data);

// export const sellersAll = async ({ id }) => api
//   .get('/customer/orders', { id }).catch((error) => error.response.data);

export const getAllSellers = async () => api
  .get('sellers').catch((error) => error.response.data);

export const createSale = async ({ totalPrice, deliveryAddress, deliveryNumber,
  userId, sellerId, itemsList, token,

}) => api.post('sale', { totalPrice,
  deliveryAddress,
  deliveryNumber,
  userId,
  sellerId,
  itemsList }, { headers: { Authorization: token } })
  .catch((error) => error.response.data);

export const getSaleByPk = async (id, token) => api
  .get(`sale/${id}`, {}, { headers: { Authorization: token } })
  .catch((error) => error.response.data);

export const getSalesBySeller = async (sellerId, token) => api
  .post('sale/seller', sellerId, { headers: { Authorization: token } })
  .catch((error) => error.response.data);

export const updateOrder = async ({ saleId, newStatus }) => api
  .patch('sale/update', { saleId, newStatus }, { headers: { Authorization: '' } });

export default api;
