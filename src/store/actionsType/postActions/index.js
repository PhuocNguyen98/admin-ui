export const GET_POST = 'GET_POST';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';

export const fetchDataSuccess = (data) => ({
  type: GET_POST,
  payload: data,
});

export const fetchAddSuccess = (data) => ({
  type: ADD_POST,
  payload: data,
});

export const fetchEditSuccess = (data) => ({
  type: EDIT_POST,
  payload: data,
});

export const fetchDeleteSuccess = (data) => ({
  type: DELETE_POST,
  payload: data,
});
