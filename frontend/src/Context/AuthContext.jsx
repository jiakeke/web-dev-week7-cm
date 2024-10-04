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

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
    localStorage.removeItem("user");
  };

  const value = {
    isLoggedIn,
    isLoading,
    token,
    logout,
    setIsLoading,
    setError,
    setIsLoggedIn,
  };

  return <AuthContext.Provider value={value} {...props} />;
}
