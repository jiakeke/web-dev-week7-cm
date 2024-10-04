import { useContext } from "react";
import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const username = useField("text");
  const password = useField("password");

  const { login, error } = useLogin("/api/users/login");

  const { isLoggedIn } = useContext(AuthContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await login({ username: username.value, password: password.value });
    if (!error) {
      console.log("login success");
      navigate("/");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="create">
        <h2>Login</h2>
        <form onSubmit={handleFormSubmit}>
          <label>UserName:</label>
          <input {...username} />
          <label>Password:</label>
          <input {...password} />
          <button>Sign up</button>
        </form>
      </div>
    );
  }
};

export default Login;
