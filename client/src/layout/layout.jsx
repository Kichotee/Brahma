import Navbar from "../components/navbar";

const Layout = ({ children }) => {
  return (
    <main>
      {" "}
      <Navbar></Navbar>
      {children}
    </main>
  );
};

export default Layout;
