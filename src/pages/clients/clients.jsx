import { useState } from 'react';
import createRandomClientData from '../../data/clients/clients';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EditProductForm from '../../components/EditProductForm';

function Clients(props) {
  const dispatch = useDispatch();
  const data = createRandomClientData;
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditProduct, setIsEditProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleChildStateChangeEditForm = (childState) => {
    setIsEditProduct(childState);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (id) => {
    setIsEditProduct(!isEditProduct);
    const productDataFind = filteredData.find((item) => item.id === id);
    setEditingProduct(productDataFind);
  };

  const handleDelete = (id) => {
    // const productDel = filteredData.find((item) => item.id === id);
    // dispatch(deleteProducts(productDel));
    // dispatch(clientDataDetailAfterDeleteProduct(productDel));
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
      {/* <div style={{ display: 'flex', marginLeft: "20px" }}>
        <button
          type="button"
          className="btn btn-success edit-btn"
          style={{ marginRight: '5px' }}
        onClick={() => handleEdit(item.id)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger"
        onClick={() => handleDelete(item.id)}
        >
          Delete
        </button>
      </div> */}
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

      {isEditProduct && (
        <EditProductForm
          onChildStateChange={handleChildStateChangeEditForm}
          {...editingProduct}
          extraProps={{ editText: 'Edit customer', saveText: 'Save' }}
          stateEdit = {editingProduct}
        />
      )}

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
              {/* <th scope="col">Edit</th> */}
            </tr>
          </thead>
          <tbody>{renderList}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Clients;
