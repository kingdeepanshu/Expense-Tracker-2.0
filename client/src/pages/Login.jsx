// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [added, setAdded] = useState(false)
  // const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://expense-tracker-2-0-one.vercel.app/api/login", { email, password });
      localStorage.setItem("token", res.data.data);
      setAdded(true)// Redirect to home page
    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    }
  };

  if (added) {
    return (
        <Navigate to='/'/>
    )
  }else{
    return (
      <div>
        <Link to="/signup">Signup</Link>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
};

export default Login;
