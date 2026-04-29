import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:80/api/auth/logout");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo cerrar sesión" });
    }
  };

  const linkStyle = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 20px",
    color: isActive ? "#ffffff" : "#a8c4e0",
    backgroundColor: isActive ? "#1e4a7a" : "transparent",
    textDecoration: "none",
    borderRadius: "8px",
    margin: "4px 10px",
    fontWeight: isActive ? "600" : "400",
    fontSize: "15px",
    transition: "all 0.2s",
  });

  return (
    <div style={{
      width: "230px",
      minHeight: "100vh",
      backgroundColor: "#0f2744",
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 100,
      boxShadow: "2px 0 10px rgba(0,0,0,0.3)",
    }}>
      {/* Logo */}
      <div style={{ padding: "24px 20px 16px", borderBottom: "1px solid #1e4a7a" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "26px" }}>🏦</span>
          <div>
            <div style={{ color: "#ffffff", fontWeight: "700", fontSize: "17px" }}>H&N Prest</div>
            <div style={{ color: "#a8c4e0", fontSize: "12px" }}>Gestión de Préstamos</div>
          </div>
        </div>
      </div>

      {/* Links */}
      <nav style={{ flex: 1, paddingTop: "12px" }}>
        <p style={{ color: "#5a8ab0", fontSize: "11px", padding: "8px 20px", textTransform: "uppercase", letterSpacing: "1px", margin: 0 }}>
          Principal
        </p>
        <NavLink to="/" style={linkStyle} end>
          <span>👥</span> Clientes
        </NavLink>
        <NavLink to="/prestamos" style={linkStyle}>
          <span>📋</span> Préstamos
        </NavLink>
        <NavLink to="/prestamo/create" style={linkStyle}>
          <span>➕</span> Nuevo Préstamo
        </NavLink>

        <p style={{ color: "#5a8ab0", fontSize: "11px", padding: "16px 20px 8px", textTransform: "uppercase", letterSpacing: "1px", margin: 0 }}>
          Sistema
        </p>
        <NavLink to="/register" style={linkStyle}>
          <span>⚙️</span> Registrar Admin
        </NavLink>
      </nav>

      {/* Logout */}
      <div style={{ borderTop: "1px solid #1e4a7a", padding: "16px 10px" }}>
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 20px",
            background: "transparent",
            border: "none",
            color: "#a8c4e0",
            fontSize: "15px",
            cursor: "pointer",
            borderRadius: "8px",
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = "#1e4a7a"}
          onMouseOut={e => e.currentTarget.style.backgroundColor = "transparent"}
        >
          <span>🚪</span> Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;