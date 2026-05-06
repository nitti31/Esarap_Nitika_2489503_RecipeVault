import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(email, password);
    if (success) {
      navigate("/recipes");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      {/* LEFT SIDE (illustration / branding area) */}
      <div className="login-left">
        <h1>RecipeVault</h1>
        <p>Save recipes, plan meals, share favorites</p>

        {/* Decorative circle (visual placeholder) */}
        <div className="circle"></div>
      </div>

      {/* RIGHT SIDE (login card) */}
      <div className="login-right">
        <form className="login-card" onSubmit={handleSubmit}>
          <p className="subtitle">SIGN IN</p>
          <h2>Cook with us</h2>
          <p className="subtitle">
            Save recipes, plan meals, share favorites
          </p>

          <label htmlFor="email">EMAIL ADDRESS</label>
          <input
            id="email"
            type="email"
            placeholder="chef@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">PASSWORD</label>
          <input
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="login-options">
            <span>Keep me signed in</span>
            <span>Forgot password?</span>
          </div>

          <button type="submit">Sign In</button>

          <p className="demo">
            Demo: chef@demo.com / cook123
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

