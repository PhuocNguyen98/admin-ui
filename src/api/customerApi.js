import { baseApi } from '~/utils/axios';

export const getCustomers = async (page, size) => {
  const res = await baseApi.get(`customer?page=${page}&size=${size}`);
  return res;
};

export const getCustomerById = async (id) => {
  const res = await baseApi.get(`/customer/${id}`);
  return res;
};

export const addCustomer = async (data) => {
  const res = await baseApi.post('/customer', data);
  return res;
};

export const editCustomer = async (id, data) => {
  const res = await baseApi.put(`/customer/${id}`, data);
  return res;
};

export const editMultipleCustomer = async (data) => {
  const res = await baseApi.put('/customer', data);
  return res;
};

export const deleteCustomer = async (id) => {
  const res = await baseApi.deleted(`/customer/${id}`);
  return res;
};
