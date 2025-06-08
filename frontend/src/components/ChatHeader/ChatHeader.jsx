import React from "react";
import styles from "./ChatHeader.module.css";
import { useMessageStore } from "../../store/useMessageStore";

const ChatHeader = () => {
  const { selectedChatUser } = useMessageStore();
  return (
    <div className={styles.container}>
      <img
        className={styles.pfp}
        src={"https://wallpapercave.com/wp/wp10509485.jpg"}
      />
      <div>{selectedChatUser?.fullName}</div>
    </div>
  );
};

export default ChatHeader;
