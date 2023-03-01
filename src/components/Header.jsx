import { NavLink } from "react-router-dom";

function Header(props) {
    return (
        <div style={{ margin: "12px 0 32px 0" }} >
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <h1 className="navbar-brand">CRUD Admin</h1>
                    <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav">
                            <NavLink to="/" className="active-link nav-item nav-link">Employees</NavLink>
                            <NavLink to="/clients" className="active-link nav-item nav-link">Customers</NavLink>
                            <NavLink to="/products" className="active-link nav-item nav-link">Products</NavLink>
                            <NavLink to="/charts" className="active-link nav-item nav-link">Charts</NavLink>
                        </div>
                        {/* <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
