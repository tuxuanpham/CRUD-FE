import { ActionTypes } from '../constants/ActionTypes';
import { combineReducers } from 'redux';
import createProductData from '../../data/products/products';
import createClientData from '../../data/clients/clients';
import clientDataDetail from '../../data/clients/clientOrderDetail';

const productData = createProductData;
const clientData = createClientData;

//Khoi tao reducer
const initStateProduct = {
  productData,
};

//Khoi tao reducer
const initStateClient = {
  clientData,
};

//Product
export const productReducer = (state = initStateProduct, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return {
        ...state,
        productData: [...state.productData, payload],
      };

    case ActionTypes.DEL_PRODUCTS:
      const productId = payload;
      const updatedProductsDelete = state.productData.filter(
        (product) => product.id !== productId.id
      );
      return {
        ...state,
        productData: updatedProductsDelete,
      };

    case ActionTypes.EDIT_PRODUCTS:
      const updatedProduct = payload;
      const updatedProducts = state.productData.map((product) => {
        if (product.id === updatedProduct.id) {
          return updatedProduct;
        }
        return product;
      });
      return {
        ...state,
        productData: updatedProducts,
      };

    default:
      return state;
  }
};

//Client
export const clientReducer = (state = initStateClient, { type, payload }) => {
  switch (type) {
    //Client data detail after delete product
    case ActionTypes.DETAIL_CLIENT_AFTER_DELETE_PRODUCT:
      return {
        ...state,
        clientDataDetail: state.clientDataDetail.map((client) => {
          console.log(client);
          return {
            ...client,
            products: client.products.filter(
              (product) => product.id !== payload.id
            ),
          };
        }),
      };

    //Detail client
    case ActionTypes.DETAIL_CLIENTS:
      return {
        ...state,
        clientDataDetail: [...payload],
      };

    default:
      return state;
  }
};

//Combine reducer
const reducers = combineReducers({
  productReducer,
  clientReducer,
});
export default reducers;
