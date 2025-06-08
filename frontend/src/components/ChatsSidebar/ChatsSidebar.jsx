import React, { useEffect } from "react";
import styles from "./ChatsSidebar.module.css";
import { useMessageStore } from "../../store/useMessageStore";
import Loader from "../Loader/Loader";
import ChatCard from "../ChatCard/ChatCard";

const ChatsSidebar = () => {
  const { loadingMessages, users, fetchUsers } = useMessageStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Chats</h2>
      {loadingMessages ? (
        <Loader />
      ) : (
        users?.map((user) => <ChatCard key={user._id} user={user} />)
      )}
    </div>
  );
};

export default ChatsSidebar;
