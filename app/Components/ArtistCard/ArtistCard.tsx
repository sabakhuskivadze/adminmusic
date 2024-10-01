"use client";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Image from "next/image"; // Import Image from next/image
import Icon from "../Icon/Icon";
import styles from "./ArtistCard.module.scss";
import axios from "axios";

type Props = {
  artistImg: string;
  artistName: string;
  artistType: string;
};

type ArtistData = {
  firstName: string;
  biography: string;
};

const ArtistCard = (props: Props) => {
  // Initialize themeColor to a string or null
  const [themeColor, setThemeColor] = useState<string | null>(Cookies.get("theme") || null); // Get initial theme from cookies
  const [getData, setGetData] = useState<ArtistData[]>([]);

  useEffect(() => {
    const updateTheme = () => {
      const newTheme = Cookies.get("theme") || null; // Ensure it falls back to null
      setThemeColor(newTheme);
    };

    const themeInterval = setInterval(updateTheme, 1000); // Adjust interval to 1 second or suitable value

    return () => clearInterval(themeInterval);
  }, []);

  const cardClassName = themeColor === "dark" ? `${styles.artistCard} ${styles.darkArtistCard}` : styles.artistCard;

  useEffect(() => {
    const userToken = Cookies.get("userToken");

    axios
      .get("https://music-back-1s59.onrender.com/artist", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((r) => {
        setGetData(r.data);
      })
      .catch((error) => {
        console.error("Error fetching artist data:", error);
      });
  }, []);

  return (
    <div className={cardClassName}>
      <div className={styles.cardContent}>
        {getData.map((artist) => (
          <div key={artist.firstName} className={styles.artistInfo}>
            <Image
              src={`/Images/${props.artistImg}.png`} // Use next/image for images
              alt={props.artistName}
              width={150} 
              height={150} 
              className={styles.artistImage} // Add a class for styling if needed
            />
            <div className={styles.artistName}>{artist.firstName}</div>
            <div className={styles.artistType}>{artist.biography}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistCard;
