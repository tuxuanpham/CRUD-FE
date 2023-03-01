import { ActionTypes } from '../constants/ActionTypes';

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};
export const editProducts = (products) => {
  return {
    type: ActionTypes.EDIT_PRODUCTS,
    payload: products,
  };
};
export const deleteProducts = (products) => {
  return {
    type: ActionTypes.DEL_PRODUCTS,
    payload: products,
  };
};
