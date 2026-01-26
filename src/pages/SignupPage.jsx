import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";
import { AuthContext } from "../context/AuthContext";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { storeToken, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signup(email, password, name);

      storeToken(response.authToken);
window.location.href = "/signup/tastes";

    } catch (err) {
      alert(err.message || "Signup failed");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-content">
        <h1>Create your account</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />

          <button type="submit" className="primary">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
