import { ActionTypes } from '../constants/ActionTypes';

export const clientOrderDetail = (products) => {
  return {
    type: ActionTypes.DETAIL_CLIENTS,
    payload: products,
  };
};
export const clientDataDetailAfterDeleteProduct = (products) => {
  return {
    type: ActionTypes.DETAIL_CLIENT_AFTER_DELETE_PRODUCT,
    payload: products,
  };
};
