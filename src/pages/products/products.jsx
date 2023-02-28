import AddProductForm from "../../components/AddProductForm";
import { useState } from "react";
import createProductData from "../../data/products/products"
import { useSelector } from 'react-redux'
import EditProductForm from "../../components/EditProductForm"
import { useDispatch } from "react-redux";
import {
    deleteProducts
} from "../../redux/actions/ProductAction";
import {
    clientOrderListRemain
} from "../../redux/actions/clientOrderList";
// import "./styles/styles.sass"

function Products(props) {
    let data = createProductData;
    let pushProducts = useSelector(state => state.productReducer.productData);

    const dispatch = useDispatch();

    if (pushProducts) {
        data = pushProducts
    }
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [isEditProduct, setIsEditProduct] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleChildStateChange = (childState) => {
        setIsAddingProduct(childState)
    }

    const handleChildStateChangeEditForm = (childState) => {
        setIsEditProduct(childState)
    }

    const handleShowAddProduct = () => {
        setIsAddingProduct(!isAddingProduct);
    }

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
            item.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.quantity.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const handleEdit = (id) => {
        setIsEditProduct(!isEditProduct)
        const product = filteredData.find((item) => item.id === id);
        setEditingProduct(product);
        dispatch(clientOrderListRemain(product))
    };


    const handleDelete = (id) => {
        const productDel = filteredData.find((item) => item.id === id);
        dispatch(deleteProducts(productDel))
        dispatch(clientOrderListRemain(productDel))
    };

    const renderList = filteredData.map((item, index) => {
        return (
            <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td class="text-start">{item.name}</td>
                <td class="text-start">{item.manufacturer}</td>
                <td>{item.price} USD</td>
                <td>{item.quantity}</td>
                <div style={{display: "flex"}} >
                    <button
                        type="button"
                        className="btn btn-success edit-btn"
                        style={{ marginRight: "5px" }}
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
        <div>
            <div className="form-group m-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <button type="button" class="btn btn-primary d-flex ms-4" onClick={handleShowAddProduct}>Add product</button>

            {isAddingProduct && <AddProductForm onChildStateChange={handleChildStateChange} />}

            {isEditProduct && (
                <EditProductForm onChildStateChange={handleChildStateChangeEditForm} {...editingProduct} extraProps={{ editText: "Edit product", saveText: "Save" }} />
            )}

            <table className="table container">
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
    );
}

export default Products;


