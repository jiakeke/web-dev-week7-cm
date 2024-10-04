import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>React Jobs</h1>
      </Link>
      <div className="links">
          <div>
            <Link to="/jobs/add-job">Add Job</Link>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
