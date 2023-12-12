import { useState } from "react";
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
            username,
            password,
        });

        const token = response.data.token;

        localStorage.setItem('token', token);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        if (err.ErrorRest) {
            alert("Failed login: " + err.ErrorRest)
        }
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={login}>
        Login
      </button>
    </div>
  );
};

export default Login;
