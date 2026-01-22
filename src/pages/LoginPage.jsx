import { useState } from "react";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Pairly</h1>

        <p className="login-subtitle">
          Match by taste, not swipes
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        <button className="login-button">
          Log in
        </button>

        <p className="login-footer">
          New here? Create an account
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
