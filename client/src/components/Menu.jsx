import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <nav className="navbar bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand  fw-bold fs-4" href="/inicio">
          H&N Préstamos
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#menuLateral"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-start bg-primary mt-3"
          id="menuLateral"
        >
          <div className="offcanvas-header ">
            <h4 className="offcanvas-title">Menu</h4>
            <button
              className="btn-close"
              type="button"
              aria-label="Close"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>
          <div className="offcanvas-body navbar-nav fs-5">
            <Link className="nav-link active" aria-current="page" to="/">
              Ver clientes
            </Link>
            <Link className="nav-link active" to="/prestamos">
              Cobrar
            </Link>
            <Link className="nav-link active" to="/prestamo/create">
              Generar préstamo
            </Link>
            <Link className="nav-link active" to="/prestamos">
              Ver préstamos
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
