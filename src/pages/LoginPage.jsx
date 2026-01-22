import {useContext, useState} from 'react'
import {AuthContext} from "../context/AuthContext";
import {useNavigation} from "react-router-dom"

function LoginPage() {
    const {login} = useContext(AuthContext)
    const navigate = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
         setError("");

         if (!email || !password) {
            setError("Complete all fields")
            return;
         }

         try {
            await login(email, password);
            navigate("/");
         }catch (err){
            setError("Email or password incorect")
         }
    };

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit ={handleSubmit}>
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

                {error && <p>{error}</p>}

                <button type="submit">Enter</button>
            </form>
        </div>
    );
}

export default LoginPage;