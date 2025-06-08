import React from "react";
import styles from "./Home.module.css";
import ChatsSidebar from "../../components/ChatsSidebar/ChatsSidebar";
import UserChat from "../../components/UserChat/UserChat";

const Home = () => {
  return (
    <div className={styles.container}>
      <ChatsSidebar />
      <UserChat />
    </div>
  );
};

export default Home;
