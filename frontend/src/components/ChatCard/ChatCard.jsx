import React from "react";
import styles from "./ChatCard.module.css";
import { useMessageStore } from "../../store/useMessageStore";

const ChatCard = ({ user }) => {
  const { selectedChatUser, setSelectedChatUser } = useMessageStore();

  const isActive = selectedChatUser === user;

  return (
    <div
      className={`${styles.card} ${isActive && styles.active}`}
      onClick={() => setSelectedChatUser(user)}
    >
      <img
        className={styles.pfp}
        src={user.profilePic || "https://wallpapercave.com/wp/wp10509485.jpg"}
        alt={`${user.fullName}'s profile`}
      />
      <div className={styles.fullName}>{user.fullName}</div>
    </div>
  );
};

export default ChatCard;
