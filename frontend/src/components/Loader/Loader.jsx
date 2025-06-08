import React from "react";
import styles from "./Loader.module.css";
import { LucideLoader } from "lucide-react";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <LucideLoader />
    </div>
  );
};

export default Loader;
