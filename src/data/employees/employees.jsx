import Chance from 'chance';
const chance = new Chance();

// function createRandomEmployeeData(num) {
//     const employData = [];
//     for (let i = 0; i < num; i++) {
//       employData.push({
//         id:"" + (i+1),
//         firstName: "First Name " + (i + 1),
//         lastName: "Last Name " + (i + 1),
//         address: "Address " + (i + 1),
//         city: "City " + (i + 1),
//         state: "State " + (i + 1),
//         zipCode: "Zip Code " + (i + 1),
//         phoneNumber: "Phone Number " + (i + 1),
//         position: "Position " + (i + 1),
//         hourlyRate: "Hourly Rate " + (i + 1),
//         dateHired: "Date Hired " + (i + 1),
//       });
//     }
//     return employData;
//   }

function createRandomEmployeeData(num) {
  const employData = [];
  for (let i = 0; i < num; i++) {
    employData.push({
      id: '' + (i + 1),
      firstName: chance.first(),
      lastName: chance.last(),
      address: chance.address(),
      city: chance.city(),
      state: chance.bool() ? 'Working' : 'Resigned',
      zipCode: chance.zip(),
      phoneNumber: chance.phone(),
      position: chance.profession(),
      hourlyRate:
        Math.floor(chance.floating({ min: 10, max: 30 }) / chance.hour()) +
        ' USD',
      dateHired: chance.year({ min: 2000, max: 2023 }),
    });
  }
  return employData;
}

export default createRandomEmployeeData(10);
