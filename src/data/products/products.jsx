import Chance from 'chance';
const chance = new Chance();

// function createProductData(num) {
//     const productData = [];
//     for (let i = 0; i < num; i++) {
//         productData.push({
//         id:"" + (i+1),
//         name: "Product name " + (i + 1),
//         manufacturer: "Manufacturer " + (i + 1),
//         price: "Price " + (i + 1),
//         quantity: "Quantity " + (i + 1),
//       });
//     }
//     return productData;
//   }

// export default createProductData(30)

function createProductData(num) {
  const productData = [];
  for (let i = 0; i < num; i++) {
    productData.push({
      id: '' + (i + 1),
      name: chance.sentence(),
      manufacturer: chance.word({ syllables: 2 }),
      price: chance.integer({ min: 100, max: 1000 }),
      quantity: chance.integer({ min: 1, max: 10 }),
    });
  }
  return productData;
}

export default createProductData(5);

// const createProductData = [
//   {
//     id: "1",
//     name: "C",
//     manufacturer: "Manufacturer C",
//     price: "112312",
//     quantity: "10232"
//   },
//   {
//     id: "2",
//     name: "B",
//     manufacturer: "Manufacturer B",
//     price: "1001",
//     quantity: "53410"
//   },
//   {
//     id: "4",
//     name: "A",
//     manufacturer: "Manufacturer A",
//     price: "1080",
//     quantity: "510"
//   }
// ]

// export default createProductData
