import { createContext, useEffect, useState } from "react";
import { verifyToken } from "../services/api";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const authenticateUser = async () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    setIsLoggedIn(false);
    setUser(null);
    setIsLoading(false);
    return;
  }

  try {
    const payload = await verifyToken();
    setIsLoggedIn(true);
    setUser(payload);
  } catch {
    setIsLoggedIn(false);
    setUser(null);
  } finally {
    setIsLoading(false);
  }
};


  const logOutUser = () => {
    removeToken();
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    authenticateUser();
  }, []);
  
  const isProfileComplete =
  user?.age && user?.bio && user?.image;


  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        isLoading,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
