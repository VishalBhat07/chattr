import React, { useEffect, useRef, useState } from "react";
import styles from "./ChatArea.module.css";
import { useMessageStore } from "../../store/useMessageStore";
import Loader from "../../components/Loader/Loader";
import { useAuthStore } from "../../store/useAuthStore";

const ChatArea = () => {
  const { authUser } = useAuthStore();
  const { chats, gettingMessages, selectedChatUser, getMessages } =
    useMessageStore();
  const containerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Fetch messages on load
  useEffect(() => {
    if (selectedChatUser?._id) {
      getMessages(selectedChatUser._id);
    }
  }, [selectedChatUser]);

  // Scroll to bottom when chats change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chats]);

  // Handle scroll to show "Scroll to bottom" button
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const nearBottom = scrollHeight - scrollTop - clientHeight < 400;
    setShowScrollButton(!nearBottom);
  };

  const scrollToBottom = () => {
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  if (gettingMessages) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.container}
        ref={containerRef}
        onScroll={handleScroll}
      >
        {chats?.map((chat) => {
          const isMine = chat.senderId === authUser.id;
          return (
            <div
              key={chat._id}
              className={`${styles.message} ${
                isMine ? styles.mine : styles.theirs
              }`}
            >
              {chat.image && (
                <img src={chat.image} alt="sent" className={styles.image} />
              )}
              {chat.text && <p className={styles.text}>{chat.text}</p>}
            </div>
          );
        })}
      </div>

      {showScrollButton && (
        <button className={styles.scrollButton} onClick={scrollToBottom}>
          ↓ Scroll to Bottom
        </button>
      )}
    </div>
  );
};

export default ChatArea;
