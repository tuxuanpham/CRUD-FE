import assignProductsToClients from "../../data/clients/clientOrderDetail"
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    clientOrderListDetail
} from "../../redux/actions/clientOrderList";
import { useState } from "react";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';



function ClientOrderDetail() {
    const dispatch = useDispatch();
    dispatch(clientOrderListDetail(assignProductsToClients))

    const { detailId } = useParams();
    const productDetail = useSelector((state) => state.clientReducer.listClientDataRemain);

    const renderOrderDetail = productDetail.find(product => product.id === detailId);

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const sortedData = renderOrderDetail.products.sort((a, b) => {
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
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.quantity.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.price.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    console.log(filteredData)

    const renderList = filteredData.map((item, index) => (
        <tr key={item.id}>
            {/* <th scope="row">{item.id}</th> */}
            <td class="text-start">{item.name}</td>
            <td>{item.manufacturer}</td>
            <td>{item.price} USD</td>
            <td>{item.quantity}</td>
            <td>{item.quantity * item.price} USD</td>
        </tr>
    ))

    const totalPrice = filteredData.reduce((acc, item) => {
        return acc + (item.quantity * item.price)
    }, 0)



    function handleExportToExcel() {
        const headerRow = ["Product ID", "Name of product", "Manufacturer", "Price", "Quantity", "Total price", "Total"];
        const data = filteredData.map((item) => ({
            "Product ID": item.id,
            "Name of product": item.name,
            "Manufacturer": item.manufacturer,
            "Price": item.price,
            "Quantity": item.quantity,
            "Total price": `${item.quantity * item.price} USD`
        }));

        const totalRow = {
            "Product ID": "",
            "Name of product": "",
            "Manufacturer": "",
            "Price": "",
            "Quantity": "",
            "Total price": "",
            "Total": `${totalPrice} USD`
        };

        const worksheet = XLSX.utils.json_to_sheet([...data, totalRow], { header: headerRow });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtered Data');
        const xlsxName = `${renderOrderDetail.firstName + "_" + renderOrderDetail.lastName}_Orders.xlsx`
        XLSX.writeFile(workbook, xlsxName);
    }



    function handleExportToPDF() {
        // Tạo đối tượng jsPDF mới
        const doc = new jsPDF();

        // Thêm nội dung vào trang PDF bằng cách sử dụng phương thức doc.text
        doc.text("Orders of " + renderOrderDetail.firstName + " " + renderOrderDetail.lastName, 10, 10);

        // Tạo bảng bằng thư viện autotable của jsPDF
        doc.autoTable({
            head: [['Product name', 'Manufacturer', 'Price', 'Quantity', 'Total price']],
            body: filteredData.map((item) => [item.name, item.manufacturer, item.price, item.quantity, item.quantity * item.price]),
            startY: 20,
        });

        // Thêm tổng giá trị vào cuối trang
        doc.text(`Total: ${totalPrice} USD`, 10, doc.autoTable.previous.finalY + 10);

        // Lưu trữ tệp PDF bằng cách sử dụng phương thức save của đối tượng jsPDF
        const pdfName = `${renderOrderDetail.firstName + "_" + renderOrderDetail.lastName}_Orders.pdf`
        doc.save(pdfName);
    }


    return (
        <div>
            <div style={{ display: "flex", marginBottom: "25px" }}>
                <button type="button" class="btn btn-success" onClick={handleExportToPDF}>Export to PDF</button>
                <button type="button" class="btn btn-info" style={{ marginLeft: '20px' }} onClick={handleExportToExcel}>Export to Excel</button>
            </div>

            <div>

                {/* <div className="form-group m-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div> */}

                <h2 className="text-start text-danger" style={{ fontStyle: "italic" }}>{"Orders of " + renderOrderDetail.firstName + " " + renderOrderDetail.lastName}</h2>
                <div class="table-responsive table-responsive-sm">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Product name</th>
                                <th scope="col">Manufacturer</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderList}
                            <h3 style={{ right: "11%", position: "absolute", color: "red" }}>Total: {totalPrice} USD</h3>
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default ClientOrderDetail