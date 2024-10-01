"use client";
import React, { useEffect, useState } from "react";
import styles from "./MenuItem.module.scss";
import Icon from "../Icon/Icon";
import { getCookie } from "../Aside/Aside";

type Props = {
  name: string;
  isActive: boolean;
  onClick: () => void;
};

const MenuItem = ({ name, isActive, onClick }: Props) => {
  const [themeColor, setThemeColor] = useState<string | null>(getCookie("theme") ?? null); // Handle undefined case

  useEffect(() => {
    const updateTheme = () => {
      const newTheme = getCookie("theme") ?? null; // Handle undefined case
      setThemeColor(newTheme);
    };

    updateTheme();

    const themeInterval = setInterval(updateTheme, 0); // Adjust interval as needed

    return () => clearInterval(themeInterval);
  }, []);

  return (
    <div
      className={`${styles.menuItem} ${isActive ? styles.active : ""} ${
        themeColor === "dark" ? styles.darkMenuItem : ""
      }`}
      onClick={onClick}
    >
      <div className={styles.itemContent}>
        <Icon name={name} isActive={isActive} onClick={onClick} />
        <span
          className={`${styles.menuText} ${isActive ? styles.activeText : ""} ${
            themeColor === "dark" ? styles.darkText : ""
          }`}
        >
          {name}
        </span>
      </div>
    </div>
  );
};

export default MenuItem;
