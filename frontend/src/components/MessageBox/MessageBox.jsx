import React, { useState } from "react";
import styles from "./MessageBox.module.css";
import { Image } from "lucide-react"; // Image icon

const MessageBox = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
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
      />
      <button className={styles.sendButton}>Send</button>
    </div>
  );
};

export default MessageBox;
