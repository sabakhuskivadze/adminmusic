"use client";
import { useState, useEffect } from "react";
import ArtistCard from "../ArtistCard/ArtistCard";
import { getCookie } from "../Aside/Aside";
import styles from "./MusicWrapper.module.scss";

type Props = {
  cards: JSX.Element[];
  name: string;
};

const MusicWrapper = (props: Props) => {
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
    <div className={`${styles.wrapper} ${themeColor === 'dark' ? styles.darkWrapper : ''}`}>
      <div className={styles.wrapperContent}>
        <h1 className={styles.title}>{props.name}</h1>
        <div className={styles.content}>
          {props.cards.map((card, index) => (
            <div key={index} className={styles.card}>
              {card}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicWrapper;
