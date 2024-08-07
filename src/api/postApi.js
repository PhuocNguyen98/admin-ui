import { baseApi } from '~/utils/axios';

export const getPosts = async () => {
  const res = await baseApi.get('/posts');
  return res;
};

export const getPostById = async (id) => {
  const res = await baseApi.get(`/posts/${id}`);
  return res;
};

export const addPost = async (data) => {
  const res = await baseApi.post('/posts', data);
  return res;
};

export const editPost = async (id, data) => {
  const res = await baseApi.put(`/posts/${id}`, data);
  return res;
};

export const deletePost = async (id) => {
  const res = await baseApi.deleted(`/posts/${id}`);
  return res;
};
