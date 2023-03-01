import clientData from './clients';
import productData from '../products/products';
import store from '../../redux/store';
import { clientOrderDetail } from '../../redux/actions/clientActions';

const getRandomProducts = (products, num) => {
  for (let i = products.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [products[i], products[j]] = [products[j], products[i]];
  }
  return products.slice(0, num);
};

var randomProducts = getRandomProducts(
  productData,
  Math.floor(Math.random() * productData.length)
);

function addProductsToClients(clients, products) {
  const updatedClients = [];
  for (const client of clients) {
    // create a new object with the same properties as the original client
    const updatedClient = { ...client };
    updatedClient.products = [];
    getRandomProducts(products, Math.floor(Math.random() * products.length));
    for (const product of getRandomProducts(
      products,
      Math.floor(Math.random() * products.length)
    )) {
      updatedClient.products.push(product);
    }
    updatedClients.push(updatedClient);
  }
  return updatedClients;
}

const updatedClients = addProductsToClients(clientData.slice(), randomProducts);

// console.log(updatedClients)

store.dispatch(clientOrderDetail(updatedClients));

export default updatedClients;
