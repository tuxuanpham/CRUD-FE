import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Employees from "./pages/employees/employees";
import Clients from "./pages/clients/clients";
import Products from "./pages/products/products";
import ClientOrderDetail from "./pages/clients/clientOrderDetail";
import Header from "./components/Header";
import CustomerChart from "./pages/charts/CustomerChart";
import employeeData from "./data/employees/employees";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Employees />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/detail/:detailId" element={<ClientOrderDetail/>} />
          <Route path="/products" element={<Products />} />
          <Route path="/charts" element={<CustomerChart dataAna={employeeData}/>} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
