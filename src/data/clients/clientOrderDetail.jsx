import listClientDataRemain from "./clients"
import productData from "../products/products"

const getRandomProducts = (products, num) => {
    for (let i = products.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [products[i], products[j]] = [products[j], products[i]];
    }
    return products.slice(0, num);
};

var randomProducts = getRandomProducts(productData, (Math.floor(Math.random() * productData.length)));

function addProductsToClients(clients, products) {

    const updatedClients = [];
    for (const client of clients) {
        client.products = [];
        getRandomProducts(productData, (Math.floor(Math.random() * productData.length)));
        for (const product of getRandomProducts(productData, (Math.floor(Math.random() * productData.length)))) {
            client.products.push(product);
        }
        updatedClients.push(client);
    }
    return updatedClients;
}

export default addProductsToClients(listClientDataRemain, randomProducts)

