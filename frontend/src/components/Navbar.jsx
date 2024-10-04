import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  if (isLoggedIn) {
  }
  return (
    <nav className="navbar">
      <Link to="/">
        <h1>React Jobs</h1>
      </Link>
      <div className="links">
        {isLoggedIn && (
          <div>
            <Link to="/jobs/add-job">Add Job</Link>
            <span>{JSON.parse(localStorage.getItem("user")).username}</span>
            <button onClick={logout}>Log out</button>
          </div>
        )}
        {!isLoggedIn && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
