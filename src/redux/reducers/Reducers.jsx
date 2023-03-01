import { ActionTypes } from '../constants/ActionTypes';
import { combineReducers } from 'redux';
import createProductData from '../../data/products/products';
import createClientData from '../../data/clients/clients';
import employeeData from '../../data/employees/employees';

const productData = createProductData;
const clientData = createClientData;

//Khoi tao reducer
const initStateProduct = {
  productData,
};

const initStateClient = {
  clientData,
};

const initStateEmployee = {
  employeeData,
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

    //Client data detail after edit product
    case ActionTypes.DETAIL_CLIENT_AFTER_EDIT_PRODUCT:
      console.log(payload)
      return {
        ...state,
        clientDataDetail: state.clientDataDetail.map((client) => {
          return {
            ...client,
            products: client.products.map((product)=>{
              if(product.id == payload.id){
                return payload;
              }
              else{
                return product
              }
            }),
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


//Employee
export const employeeReducer = (state = initStateEmployee, { type, payload }) => {
  switch (type) {
    //Client data detail after delete product
    // case ActionTypes.DETAIL_CLIENT_AFTER_DELETE_PRODUCT:
    //   return {
    //     ...state,
    //     clientDataDetail: state.clientDataDetail.map((client) => {
    //       console.log(client);
    //       return {
    //         ...client,
    //         products: client.products.filter(
    //           (product) => product.id !== payload.id
    //         ),
    //       };
    //     }),
    //   };

    //Client data detail after edit product
    // case ActionTypes.DETAIL_CLIENT_AFTER_EDIT_PRODUCT:
    //   console.log(payload)
    //   return {
    //     ...state,
    //     clientDataDetail: state.clientDataDetail.map((client) => {
    //       return {
    //         ...client,
    //         products: client.products.map((product)=>{
    //           if(product.id == payload.id){
    //             return payload;
    //           }
    //           else{
    //             return product
    //           }
    //         }),
    //       };
    //     }),
    //   };

    //Detail client
    case ActionTypes.SET_EMPLOYEE:
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
  employeeReducer
});
export default reducers;
