import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import "./styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await login(email, password); // 로그인 API 호출
      setError("");
      alert(`Welcome, ${data.username}`);
      navigate("/notepad"); // 로그인 성공 시 메모장 페이지로 이동
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const handleSignUpNavigation = () => {
    navigate("/signup"); // 회원가입 페이지로 이동
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="text"
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
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignUpNavigation} className="signup-button">
        Sign Up
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;
