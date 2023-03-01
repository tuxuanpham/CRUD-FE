import { ActionTypes } from '../constants/ActionTypes';

export const setEmployee = (products) => {
  return {
    type: ActionTypes.SET_EMPLOYEE,
    payload: products,
  };
};