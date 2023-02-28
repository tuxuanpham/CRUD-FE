
import { useState } from "react";
import createRandomEmployeeData from "../../data/employees/employees"

function Employees(props) {
    const data = createRandomEmployeeData;
    const [searchTerm, setSearchTerm] = useState("");

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
            item.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.hourlyRate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.dateHired.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const renderList = filteredData.map((item, index) => {
        return (
            <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.address}</td>
                <td>{item.city}</td>
                <td>{item.state}</td>
                <td>{item.zipCode}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.position}</td>
                <td>{item.hourlyRate}</td>
                <td>{item.dateHired}</td>
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
            <table className="table container">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">City</th>
                        <th scope="col" style={{color: 'red'}}>State</th>
                        <th scope="col">Zipcode</th>
                        <th scope="col">Phone number</th>
                        <th scope="col">Position</th>
                        <th scope="col">Hourly Rate</th>
                        <th scope="col">Date hired</th>
                    </tr>
                </thead>
                <tbody>{renderList}</tbody>
            </table>
        </div>
    );
}

export default Employees;


