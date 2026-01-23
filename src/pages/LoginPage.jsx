import { useState } from "react";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Pairly</h1>
        <p className="subtitle">Match by taste, not swipes</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Log in</button>

        <p className="footer-text">New here? Create an account</p>
      </div>
    </div>
  );
}

export default LoginPage;
