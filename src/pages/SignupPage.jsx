import {useContext, useState} from 'react';
import {useNavigation, Link} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import api from "../services/api";

function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

function SignupPage() {
  const navigate = useNavigation();
  const { login } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")

    if (!name || !email || !password || !birthDate || !gender ) {
        setError("Complet all fields")
        return;
    }

    const age = calculateAge(birthDate);

    if (age < 18) {
        setError("You need to be at least 18 years of age to use Pairly")
        return;
    }

    try {
        setLoading(true);

        await api.post("/api/auth/signup", {
            name: name.trim(),
            email:email.trim(),
            password,
            birthDate,
            age,
            gender,
        });

        await login(email.trim(), password);
        navigate("discovery");
    }catch (err) {
      const msg =
        err?.response?.data?.errorMessage ||
        err?.response?.data?.message ||
        "You can`t create a acount";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <h2>Create your acount</h2>

        <form onSubmit={handleSubmit}>
            <label>
                <p>Name</p>
                <imput
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>

            <label>
                <p>Email</p>
                <imput
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>

            <label>
                <p>Password</p>
                <imput
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>

            <label>
                <p>Birth Date</p>
                <imput
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                />
            </label>

            <label>
                <p>Gender</p>
                <select value= {gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">Select</option>
                    <option value="woman">Woman</option>
                    <option value="man">Man</option>
                    <option value="elf">Elf</option>
                    <option value="dwarf">Dwarf</option>
                    <option value="troll">Troll</option>
                </select>
            </label>

            {error && <p>{error}</p>}

                <button type="submit" disable= {loading}>{loading ? "Creating..." : "Register"}</button>
        </form>
        
      <p>
        You have a acount <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default SignupPage;