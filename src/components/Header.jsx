import { NavLink } from 'react-router-dom';

function Header(props) {
  
  function hideDropdownMenu() {
    const dropdownMenu = document.querySelector('.dropdown-menu.show');
    if (dropdownMenu) {
      dropdownMenu.classList.remove('show');
    }
  }

  document.addEventListener('click', function (event) {
    const target = event.target;
    if (!target.matches('.dropdown-toggle')) {
      hideDropdownMenu();
    }
  });

  const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
  dropdownLinks.forEach(link => {
    link.addEventListener('click', hideDropdownMenu);
  });

  return (
    <div style={{ margin: '12px 0 32px 0' }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <h1 className="navbar-brand">CRUD Admin</h1>
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav">
              <NavLink to="/" className="active-link nav-item nav-link">
                Employees
              </NavLink>
              <NavLink to="/clients" className="active-link nav-item nav-link">
                Customers
              </NavLink>
              <NavLink to="/products" className="active-link nav-item nav-link">
                Products
              </NavLink>
              <div className="nav-item dropdown" onMouseEnter={() => document.getElementById('chartsDropdown').classList.add('show')} onMouseLeave={() => document.getElementById('chartsDropdown').classList.remove('show')}>
                <NavLink to="/charts" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                  Charts
                </NavLink>
                <div className="dropdown-menu" id="chartsDropdown" style={{ padding: 0, borderRadius: 0 }}>
                  <NavLink to="/charts/employees" className="dropdown-item">Employees</NavLink>
                  <NavLink to="/charts/customers" className="dropdown-item">Customers</NavLink>
                </div>
              </div>

            </div>
            {/* <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
