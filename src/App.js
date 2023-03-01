import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Employees from './pages/employees/employees';
import Clients from './pages/clients/clients';
import Products from './pages/products/products';
import ClientOrderDetail from './pages/clients/clientOrderDetail';
import Header from './components/Header';
import EmployeesChart from './pages/charts/employeesChart';
import CustomersChart from './pages/charts/customersChart';
import employeeData from './data/employees/employees';
import customerOrderData from './data/clients/clientOrderDetail';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container>
        <HashRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Employees />} />
            <Route path="/clients" element={<Clients />} />
            <Route
              path="/clients/detail/:detailId"
              element={<ClientOrderDetail />}
            />
            <Route path="/products" element={<Products />} />

            {/* Charts */}
            <Route
              path="/charts/employees"
              element={<EmployeesChart dataAna={employeeData} />}
            />
            <Route
              path="/charts/customers"
              element={<CustomersChart dataAna={customerOrderData} />}
            />

          </Routes>
        </HashRouter>
      </Container>
    </div>
  );
}

export default App;
