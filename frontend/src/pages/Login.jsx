import useField from "../hooks/useField";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

const Login = () => {
  const navigate = useNavigate();
  const email = useField("email");
  const password = useField("password");

  const { login, error } = useContext(AuthContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await login({ email: email.value, password: password.value });
    if (!error) {
      console.log("login success");
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Email address:</label>
        <input {...email} />
        <label>Password:</label>
        <input {...password} />
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default Login;
