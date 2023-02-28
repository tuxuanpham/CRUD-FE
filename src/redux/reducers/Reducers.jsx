import { ActionTypes } from "../constants/ActionTypes";
import { combineReducers } from "redux";
import createProductData from "../../data/products/products"
import createClientData from "../../data/clients/clients"

const productData = createProductData
const listClientDataRemain = createClientData

//Khoi tao reducer
const initStateProduct = {
  productData
};

//Khoi tao reducer
const initStateClient = {
  listClientDataRemain
};

//Product
export const productReducer = (state = initStateProduct, { type, payload }) => {
  switch (type) {

    case ActionTypes.SET_PRODUCTS:
      return {
        ...state,
        productData: [...state.productData, payload]
      };

    case ActionTypes.DEL_PRODUCTS:
      const productId = payload;
      const updatedProductsDelete = state.productData.filter(product => product.id !== productId.id);
      return {
        ...state,
        productData: updatedProductsDelete
      };

    case ActionTypes.EDIT_PRODUCTS:
      const updatedProduct = payload;
      const updatedProducts = state.productData.map(product => {
        if (product.id === updatedProduct.id) {
          return updatedProduct;
        }
        return product;
      });
      return {
        ...state,
        productData: updatedProducts
      };

    default:
      return state;
  }
};

//Client
export const clientReducer = (state = initStateClient, { type, payload }) => {
  switch (type) {

    case ActionTypes.LIST_CLIENT_DATA_REMAIN:
      return {
        ...state,
        listClientDataRemain: state.listClientDataRemain.map(client => {
          return {
            ...client,
            products: client.products.filter(product => product.id !== payload.id)
          }
        })
      };

    case ActionTypes.LIST_CLIENT_ORDER_DETAIL:
      return {
        ...state,
        listClientOrderDetail: payload
      };

    default:
      return state;
  }
};

//Combine reducer
const reducers = combineReducers({
  productReducer,
  clientReducer
});
export default reducers;