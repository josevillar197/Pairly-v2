import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    console.log("SIGNUP DATA:", { name, email, password });

    try {
      const res = await signup(email, password, name);
      localStorage.setItem("authToken", res.authToken);
      navigate("/signup/tastes/movie");

    } catch {
      alert("Signup failed");
    }
  };

 return (
  <div className="signup-page">
    <div className="signup-content">
      <h1>Create an account</h1>
      <p className="signup-subtitle">
        Find people who actually share your tastes
      </p>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
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

      <button className="primary" onClick={handleSignup}>
        Continue
      </button>
    </div>
  </div>
);

}

export default SignupPage;
