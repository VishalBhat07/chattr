import React, { useState } from "react";
import styles from "./Signup.module.css";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signup } = useAuthStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }
    signup(formData);
  };

  return (    
    <div className={styles.container}>
      {/* Left form section */}
      <div className={styles.left}>
        <h2 className={styles.heading}>Create your account .</h2>
        <p className={styles.subheading}>Sign up to start chatting on Chattr</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Your Name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            required
          />

          <label>Email</label>
          <input
            type="email"
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

          <button type="submit">Sign Up</button>
          <div className={styles.options}>
            <span>
              Already have an account?{" "}
              <a href="/login" className={styles.link}>
                Login
              </a>{" "}
              instead
            </span>
          </div>
        </form>
      </div>

      {/* Right placeholder section */}
      <div className={styles.right}>
        <h3 className={styles.tagline}>Join Chattr Today!</h3>
        <p>
          Create your account and start connecting with friends and colleagues
          in real time.
        </p>
      </div>
    </div>
  );
};

export default Signup;
