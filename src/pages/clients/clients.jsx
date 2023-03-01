import { useState } from 'react';
import createRandomClientData from '../../data/clients/clients';
import { Link } from 'react-router-dom';

function Clients(props) {
  const data = createRandomClientData;
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const sortedData = data.sort((a, b) => {
    if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
      return -1;
    }
    if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
      return 1;
    }
    if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) {
      return -1;
    }
    if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  const filteredData = sortedData.filter((item) => {
    return (
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.zipCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phoneNumber.includes(searchTerm) ||
      item.emailAddress.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const renderList = filteredData.map((item, index) => (
    <tr key={item.id}>
      <th scope="row">{item.id}</th>
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>{item.address}</td>
      <td>{item.city}</td>
      <td
        style={{
          color: item.state === 'Log in' ? 'green' : 'blue',
          fontWeight: item.state === 'Log in' ? 'bold' : 'normal',
          fontStyle: item.state === 'Log in' ? 'italic' : 'normal',
        }}
      >
        {item.state}
      </td>
      <td>{item.zipCode}</td>
      <td>{item.phoneNumber}</td>
      <td>{item.emailAddress}</td>
      <td>
        <Link to={`/clients/detail/${item.id}`}>Detail</Link>
      </td>
    </tr>
  ));

  return (
    <div style={{ margin: '12px 0 32px 0' }}>
      <h1 style={{ textAlign: 'left', marginBottom: '32px' }}>
        Customer manage
      </h1>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div class="table-responsive table-responsive-sm">
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Address</th>
              <th scope="col">City</th>
              <th scope="col" style={{ color: 'red' }}>
                State
              </th>
              <th scope="col">Zipcode</th>
              <th scope="col">Phone number</th>
              <th scope="col">Email address</th>
              <th scope="col" style={{ color: 'red' }}>
                Detail
              </th>
            </tr>
          </thead>
          <tbody>{renderList}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Clients;
