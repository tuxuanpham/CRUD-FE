import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Employees from "./pages/employees/employees";
import Clients from "./pages/clients/clients";
import Products from "./pages/products/products";
import ClientOrderDetail from "./pages/clients/clientOrderDetail";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Employees />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/detail/:detailId" element={<ClientOrderDetail />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
