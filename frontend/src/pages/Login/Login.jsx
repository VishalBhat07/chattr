import React, { useState } from "react";
import styles from "./Login.module.css";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }
    login(formData);
  };

  return (
    <div className={styles.container}>
      {/* Left form section */}
      <div className={styles.left}>
        <h2 className={styles.heading}>Welcome Back 👋</h2>
        <p className={styles.subheading}>Login to your Chattr account</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Email</label>
          <input
            type="text"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          <label>Password</label>
          <div className={styles.passwordInput}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            {showPassword ? (
              <EyeOff onClick={() => setShowPassword(false)} />
            ) : (
              <Eye onClick={() => setShowPassword(true)} />
            )}
          </div>

          <button type="submit">Login</button>
          <div className={styles.options}>
            <span>
              Don&apos;t have an account?{" "}
              <a href="/signup" className={styles.link}>
                sign up
              </a>{" "}
              instead
            </span>
            <span>
              Forgot your password?{" "}
              <a href="/forgot-password" className={styles.link}>
                click here
              </a>
            </span>
          </div>
        </form>
      </div>

      {/* Right placeholder section */}
      <div className={styles.right}>
        <h3 className={styles.tagline}>Chat. Connect. Collaborate.</h3>
        <p>Chattr brings seamless messaging with real-time engagement.</p>
      </div>
    </div>
  );
};

export default Login;
