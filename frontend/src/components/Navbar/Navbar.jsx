import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useThemeStore } from "../../store/useThemeStore";
import {
  MessageSquareText,
  LogOut,
  User,
  Settings,
  Sun,
  Moon,
  Menu,
} from "lucide-react";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Navbar.module.css";
import { useMessageStore } from "../../store/useMessageStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const { setSelectedChatUser } = useMessageStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <nav className={styles.container}>
        <div className={styles.logo}>
          <MessageSquareText className={styles.logoIcon} />
          <span className={styles.logoText}>Chattr</span>
        </div>

        <ul className={styles.buttons}>
          <li className={styles.navItem}>
            <Settings className={styles.icon} />
            <span>Settings</span>
          </li>
          <li className={styles.navItem}>
            <User className={styles.icon} />
            <span>Profile</span>
          </li>
          <li className={styles.navItem} onClick={toggleTheme}>
            {theme === "light" ? (
              <Moon className={styles.icon} />
            ) : (
              <Sun className={styles.icon} />
            )}
          </li>
          {authUser && (
            <li
              className={`${styles.navItem} ${styles.logout}`}
              onClick={() => {
                setSelectedChatUser(null);
                logout();
              }}
            >
              <LogOut className={styles.icon} />
              <span>Logout</span>
            </li>
          )}
        </ul>

        {/* Hamburger icon for small screens */}
        <Menu
          className={styles.hamburger}
          onClick={() => setSidebarOpen(true)}
        />
      </nav>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Navbar;
