"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getCookie } from "../Aside/Aside";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { ButtonStyle } from "../ButtonStyles";
import styles from "./TopChart.module.scss"; // Change to .css
import axios from "axios";
import Image from 'next/image'; // Import Image from next/image

interface Props {
  image: string;
  songName: string;
  artistName: string;
  rank: string;
}

const TopChart = (props: Props) => {
  // Set themeColor to null by default; provide fallback to null for undefined
  const [themeColor, setThemeColor] = useState<string | null>(getCookie("theme") ?? null);
  const [getData, setGetData] = useState([]);

  useEffect(() => {
    const updateTheme = () => {
      const newTheme = getCookie("theme");
      setThemeColor(newTheme ?? null); // Set to null if undefined
    };

    updateTheme();

    const themeInterval = setInterval(updateTheme, 0); // Adjust interval as needed

    return () => clearInterval(themeInterval);
  }, []);

  const containerClassName = themeColor === 'dark' ? `${styles.mainContainer} ${styles.darkMainContainer}` : styles.mainContainer;

  useEffect(() => {
    const userToken = Cookies.get("userToken");

    axios.get('https://music-back-1s59.onrender.com/music', {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).then((r) => {
      setGetData(r.data);
    });
  }, []);

  return (
    <div className={containerClassName}>
      <div className={styles.imageContainer}>
        <Image
          src={`/Images/${props.image}.png`}
          alt="image"
          className={styles.topImage}
          height={176} // Set appropriate height
          width={168}  // Set appropriate width
          layout="intrinsic" // Maintain aspect ratio
        />
      </div>
      <div className={styles.chartInfo}>
        <div className={styles.container}>
          <p className={styles.song}>{props.songName}</p>
          <p className={styles.artist}>{props.artistName}</p>
        </div>
        <div className={styles.bottom}>
          <p className={styles.rank}>Top {props.rank}</p>
          <ButtonIcon
            icon="triangle"
            onClick={() => console.log("jigar damklikes")}
            style={ButtonStyle.Red}
          />
        </div>
      </div>
    </div>
  );
};

export default TopChart;
