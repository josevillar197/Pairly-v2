import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function PublicRoute({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isLoggedIn) {
    return <Navigate to="/discover" replace />;
  }

  return children;
}

export default PublicRoute;
