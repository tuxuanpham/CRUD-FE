import Chance from "chance";
const chance = new Chance();

function createRandomClientData(num) {
  const clientData = [];
  for (let i = 0; i < num; i++) {
    clientData.push({
      id: "" + (i + 1),
      firstName: chance.first(),
      lastName: chance.last(),
      address: chance.address(),
      city: chance.city(),
      state: chance.bool() ? "Log in" : "Log out", 
      zipCode: chance.zip(),
      phoneNumber: chance.phone(),
      emailAddress: chance.email()
    });
  }
  return clientData;
}

export default createRandomClientData(50)

