import { Link } from "react-router-dom";

function Header(props) {
    return (
        <div class="m-4">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <h1 class="navbar-brand">CRUD Admin</h1>
                    <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                        <div class="navbar-nav">
                            <Link to="/" class="nav-item nav-link active">Employees</Link>
                            <Link to="/clients" class="nav-item nav-link">Customers</Link>
                            <Link to="/products" class="nav-item nav-link">Products</Link>
                        </div>
                        {/* <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button class="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
