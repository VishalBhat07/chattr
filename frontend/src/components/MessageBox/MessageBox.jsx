import React, { useState } from "react";
import styles from "./MessageBox.module.css";
import { Image } from "lucide-react"; // Image icon
import { useMessageStore } from "../../store/useMessageStore";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

const MessageBox = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const { sendingMessage, selectedChatUser, sendMessage } = useMessageStore();

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleMessageSend = () => {
    if (!text && !file) {
      toast.error("Message not sent");
      return;
    }

    sendMessage(selectedChatUser._id, text, file);

    setImage(null);
    setFile(null);
    setText("");
  };

  return (
    <div className={styles.container}>
      <label htmlFor="imageInput" className={styles.imageIcon}>
        <Image size={22} />
      </label>
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        className={styles.hiddenInput}
        onChange={handleImageChange}
      />

      {image && (
        <div className={styles.preview}>
          <img src={image} alt="Preview" />
        </div>
      )}

      <input
        type="text"
        className={styles.input}
        placeholder="Type your message..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      {!sendingMessage ? (
        <button
          className={styles.sendButton}
          onClick={() => handleMessageSend()}
        >
          Send
        </button>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default MessageBox;
