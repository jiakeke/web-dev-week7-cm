import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function useLogin(url) {
  // const [error, setError] = useState(null);
  // const [isLoading, setIsLoading] = useState(null);
  const { setIsLoggedIn, error, setError, setIsLoading } =
    useContext(AuthContext);

  const login = async (object) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object),
    });
    const user = await response.json();

    if (!response.ok) {
      setError(user.error);
      setIsLoading(false);
      return error;
    }

    // localStorage.setItem("token", user.token);
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoading(false);
    setIsLoggedIn(true);
  };

  return { login };
}
