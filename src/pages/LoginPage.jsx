import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { storeToken, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    login(email, password)
      .then((data) => {
        storeToken(data.authToken);
        authenticateUser();
        navigate("/discover");
      })
      .catch(() => {
        alert("Login failed");
      });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Pairly</h1>
        <p className="subtitle">Match by taste, not swipes</p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button onClick={handleLogin}>Log in</button>

        <p className="footer-text">
  New here? <Link to="/signup">Create an account</Link>
</p>

      </div>
    </div>
  );
}

export default LoginPage;
