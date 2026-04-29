import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f0f4f8" }}>
      <Sidebar />
      <main style={{
        marginLeft: "230px",
        flex: 1,
        padding: "30px",
        minHeight: "100vh",
        overflowY: "auto",
      }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;