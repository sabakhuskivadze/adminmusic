"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Aside, { getCookie } from "./Components/Aside/Aside";
import TopChart from "./Components/TopChart/TopChart";
import Header from "./Components/Header/Header";
import MusicWrapper from "./Components/MusicWrapper/MusicWrapper";
import MusicCard from "./Components/MusicCard/Musiccard";
import ArtistCard from "./Components/ArtistCard/ArtistCard";

const Home = () => {
  const [query, setQuery] = useState<string>("");
  const [themeColor, setThemeColor] = useState(getCookie("theme") || "");

  useEffect(() => {
    const updateTheme = () => {
      const newTheme = getCookie("theme");
      setThemeColor(String(newTheme));
    };

    updateTheme();

    const themeInterval = setInterval(updateTheme, 0); // Adjust interval as needed

    return () => clearInterval(themeInterval); 
  }, []);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const artistCards = [
    <ArtistCard key={"artist-1"} artistImg={"artist"} artistName={"Travis Scott"} artistType={"Artist"} />,  
  ];

  const popularHits = [
    <MusicCard key={"music-1"} albumCover={"popHit"} author={"Juice WRLD"} songTitle={"Robbery"} />,
  ];

  const popularCharts = [
    <TopChart key={"chart-1"} image={"topChart"} songName={"Good Days"} artistName={"SZA"} rank={"1"} />,
  ];

  return (
    <div className={styles.mainContent}>
      <Aside />
      <div className={`${styles.static} ${themeColor === 'dark' ? styles.darkStatic : ''}`}>
        <Header />
        <MusicWrapper cards={artistCards} name={"Popular artists"} />
        <MusicWrapper cards={popularHits} name={"Popular hits of the week"} />
        <MusicWrapper cards={popularCharts} name={"Popular Charts"} />
      </div>
    </div>
  );
};

export default Home;
