import AddProductForm from '../../components/AddProductForm';
import { useState } from 'react';
import createProductData from '../../data/products/products';
import { useSelector, useDispatch } from 'react-redux';
import EditProductForm from '../../components/EditProductForm';
import { deleteProducts, editProducts } from '../../redux/actions/productActions';
import { clientDataDetailAfterDeleteProduct, clientDataDetailAfterEditProduct } from '../../redux/actions/clientActions';

function Products(props) {
  let data = createProductData;
  let pushProducts = useSelector((state) => state.productReducer.productData);

  const dispatch = useDispatch();

  if (pushProducts) {
    data = pushProducts;
  }
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isEditProduct, setIsEditProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleChildStateChange = (childState) => {
    setIsAddingProduct(childState);
  };

  const handleChildStateChangeEditForm = (childState) => {
    setIsEditProduct(childState);
  };

  const handleShowAddProduct = () => {
    setIsAddingProduct(!isAddingProduct);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const sortedData = data.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  const filteredData = sortedData.filter((item) => {
    return (
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.price.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.price.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleEdit = (id) => {
    setIsEditProduct(!isEditProduct);
    const productDataFind = filteredData.find((item) => item.id === id);
    setEditingProduct(productDataFind);
  };

  const handleDelete = (id) => {
    const productDel = filteredData.find((item) => item.id === id);
    dispatch(deleteProducts(productDel));
    dispatch(clientDataDetailAfterDeleteProduct(productDel));
  };

  const renderList = filteredData.map((item, index) => {
    return (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td class="text-start">{item.name}</td>
        <td class="text-start">{item.manufacturer}</td>
        <td>{item.price} USD</td>
        <td>{item.quantity}</td>
        <div style={{ display: 'flex' }}>
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
        </div>
      </tr>
    );
  });

  return (
    <div style={{ margin: '12px 0 32px 0' }}>
      <h1 style={{ textAlign: 'left', marginBottom: '32px' }}>
        Product manage
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
      <button
        style={{ margin: '16px 0' }}
        type="button"
        class="btn btn-primary d-flex"
        onClick={handleShowAddProduct}
      >
        Add product
      </button>

      {isAddingProduct && (
        <AddProductForm onChildStateChange={handleChildStateChange} />
      )}

      {isEditProduct && (
        <EditProductForm
          onChildStateChange={handleChildStateChangeEditForm}
          {...editingProduct}
          extraProps={{ editText: 'Edit product', saveText: 'Save' }}
          stateEdit = {editingProduct}
        />
      )}

      <div class="table-responsive table-responsive-sm">
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Product name</th>
              <th scope="col">Manufacturer</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>{renderList}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
