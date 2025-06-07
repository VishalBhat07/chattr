// Sidebar.jsx
import React from "react";
import {
  LogOut,
  Settings,
  User,
  Sun,
  Moon,
  X,
} from "lucide-react";

import styles from "./Sidebar.module.css";
import { useAuthStore } from "../../store/useAuthStore";
import { useThemeStore } from "../../store/useThemeStore";

const Sidebar = ({ isOpen, onClose }) => {
  const { authUser, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <button className={styles.close} onClick={onClose}>
        <X />
      </button>
      <ul className={styles.menu}>
        <li onClick={toggleTheme}>
          {theme === "light" ? (
            <Moon className={styles.icon} />
          ) : (
            <Sun className={styles.icon} />
          )}{" "}
          Theme
        </li>
        <li>
          <Settings className={styles.icon} /> Settings
        </li>
        <li>
          <User className={styles.icon} /> Profile
        </li>
        {authUser && (
          <li onClick={logout}>
            <LogOut className={styles.icon} /> Logout
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
