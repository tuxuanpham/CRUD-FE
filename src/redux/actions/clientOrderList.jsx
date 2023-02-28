import { ActionTypes } from "../constants/ActionTypes";

export const clientOrderListDetail = (products) => {
    return {
        type: ActionTypes.LIST_CLIENT_ORDER_DETAIL,
        payload: products,
    };
};


export const clientOrderListRemain = (products) => {
    return {
        type: ActionTypes.LIST_CLIENT_DATA_REMAIN,
        payload: products,
    };
};