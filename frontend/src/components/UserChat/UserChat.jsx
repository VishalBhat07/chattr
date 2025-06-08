import React from "react";
import styles from "./UserChat.module.css";
import ChatHeader from "../ChatHeader/ChatHeader";
import ChatArea from "../ChatArea/ChatArea";
import MessageBox from "../MessageBox/MessageBox";
import { useMessageStore } from "../../store/useMessageStore";

const UserChat = () => {
  const { selectedChatUser } = useMessageStore();

  if (!selectedChatUser)
    return (
      <div className={styles.right}>
        <h3 className={styles.tagline}>Chat. Connect. Collaborate.</h3>
        <p>Chattr brings seamless messaging with real-time engagement.</p>
      </div>
    );

  return (
    <div className={styles.container}>
      <ChatHeader />
      <ChatArea />
      <MessageBox />
    </div>
  );
};

export default UserChat;
