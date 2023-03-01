import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts } from '../redux/actions/productActions';
import { v4 as uuidv4 } from 'uuid';

function AddProductForm(props) {
  const [formData, setFormData] = useState({
    name: '',
    manufacturer: '',
    price: '',
    quantity: '',
  });

  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(true);

  const handleshowForm = () => {
    setShowForm(!showForm);
    props.onChildStateChange(!showForm);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
    // you can access the form data from the formData state
    const newProduct = {
      id: new Date().getTime().toString(),
      name: formData.name,
      manufacturer: formData.manufacturer,
      price: formData.price,
      quantity: formData.quantity,
    };
    dispatch(setProducts(newProduct));
    setShowForm(!showForm);
    handleshowForm();
  };

  return (
    <>
      {showForm && (
        <div>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.8)', // trắng với độ mờ là 80%
            }}
          >
            <button
              type="button"
              class="btn-close red"
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '20%',
                right: '20%',
              }}
              onClick={handleshowForm}
            ></button>
          </div>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              border: '1px solid black',
              padding: '10px',
              borderRadius: '20px',
              backgroundColor: 'white',
              width: '50%',
            }}
          >
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="manufacturer" className="form-label">
                  Manufacturer
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="manufacturer"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-warning">
                Add new product
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddProductForm;
