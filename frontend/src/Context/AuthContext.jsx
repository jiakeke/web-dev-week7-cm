import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedJwt = localStorage.getItem("user");
    if (storedJwt) {
      setIsLoggedIn(true);
      setToken(storedJwt.token);
    }
    setIsLoading(false);
  }, []);

  const login = async (object) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object),
    });
    const user = await response.json();

    if (!response.ok) {
      setError(user.error);
      setIsLoading(false);
      return error;
    } else {
      setIsLoggedIn(true);
    }

    // localStorage.setItem("token", user.token);
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
    localStorage.removeItem("user");
  };

  const value = {
    isLoggedIn,
    isLoading,
    token,
    login,
    logout,
    setIsLoading,
    setError,
    setIsLoggedIn,
  };

  return <AuthContext.Provider value={value} {...props} />;
}
