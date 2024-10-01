"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./ComputerPlayer.module.scss";
import { Slider } from "antd";
import songs from "@/public/Consts/songs"; // Assuming you have a songs array
import Icon from "../Icon/Icon";
import { getCookie } from "../Aside/Aside";
import axios from "axios";
import Cookies from "js-cookie";
import { useCallback } from "react";
import Image from 'next/image';

interface Song {
  id: number;
  title: string;
  artist: string;
  url: string;
  coverUrl: string;
}

export default function Player() {
  const [disabled, setDisabled] = useState(false);
  const [musicVolume, setMusicVolume] = useState(50);
  const [voiceVolume, setVoiceVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [currentSongId, setCurrentSongId] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrackTime, setCurrentTrackTime] = useState(0);
  const [songEnded, setSongEnded] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState<Song[]>([]);
  const currentSong = songs.find((song) => song.id === currentSongId);
  const [themeColor, setThemeColor] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMusicVolume = localStorage.getItem("music");
      const savedVoiceVolume = localStorage.getItem("voice");
      const savedTheme = localStorage.getItem("theme");

      if (savedMusicVolume) setMusicVolume(Number(savedMusicVolume));
      if (savedVoiceVolume) setVoiceVolume(Number(savedVoiceVolume));
      if (savedTheme) setThemeColor(savedTheme);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentSong) {
      audio.src = currentSong.url;
      isPlaying ? audio.play() : audio.pause();
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && isPlaying) {
        setCurrentTrackTime(audioRef.current.currentTime);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    const handleSongEnd = () => setSongEnded(true);
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("ended", handleSongEnd);
      return () => audio.removeEventListener("ended", handleSongEnd);
    }
  }, [currentSongId]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkipForward = useCallback(() => {
    setCurrentSongId((prevId) => {
      let nextId;
      if (shuffle) {
        nextId = songs[Math.floor(Math.random() * songs.length)].id;
        while (nextId === prevId && songs.length > 1) {
          nextId = songs[Math.floor(Math.random() * songs.length)].id;
        }
      } else {
        const currentIndex = songs.findIndex((song) => song.id === prevId);
        nextId = songs[(currentIndex + 1) % songs.length].id;
      }
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      return nextId;
    });
  }, [shuffle]);

  const handleSkipBackward = () => {
    setCurrentSongId((prevId) => {
      const currentIndex = songs.findIndex((song) => song.id === prevId);
      const newId = songs[(currentIndex - 1 + songs.length) % songs.length].id;
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      return newId;
    });
  };

  useEffect(() => {
    if (songEnded) {
      handleSkipForward();
      setSongEnded(false);
    }
  }, [songEnded, handleSkipForward]);

  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleTimeChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTrackTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }, 300);

  const handleMusicVolumeChange = (value: number) => {
    setMusicVolume(value);
    if (typeof window !== "undefined") {
      localStorage.setItem("music", value.toString());
    }
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  };

  const handleIconClick = () => {
    setIsActive(!isActive);
    const userToken = Cookies.get("userToken");

    if (!isActive && userToken) {
      axios
        .post(
          "https://music-back-1s59.onrender.com/playlist",
          { name: "s", description: "s", musicIds: [1] },
          { headers: { Authorization: `Bearer ${userToken}` } }
        )
        .catch(() => {
          console.log("Error adding to playlist");
        });
    }
  };

  useEffect(() => {
    const userToken = Cookies.get("userToken");

    axios
      .get("https://music-back-1s59.onrender.com/users/me", {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        if (Array.isArray(response.data.playlists)) {
          setData(response.data.playlists);
        } else {
          console.warn("Unexpected data structure:", response.data);
          setData([]);
        }
      })
      .catch(() => {
        console.log("Error fetching user data");
      });
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getIconPath = (iconName: string) => {
    return `icons/${iconName}${themeColor === "light" ? "Light" : ""}.svg`;
  };
  return (
<>
<div className={`${styles.computerPlayer} ${themeColor === 'light' ? styles.lightPlayer : ''}`}>
  <audio ref={audioRef} />
  <div className={styles.Player}>
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.textGrid}>
          {/* Add the src attribute to the img element */}
          <img className={styles.img} src={currentSong?.url || '/path/to/default/image.png'} alt={currentSong?.title} />
          <div className={styles.artistInfo}>
            <h3 className={`${styles.Text} ${themeColor === 'light' ? styles.lightText : ''}`}>{currentSong?.title || 'Unknown Title'}</h3>
            <p className={styles.Text2}>{currentSong?.artist || 'Unknown Artist'}</p>
          </div>
          <div className={styles.icon}>
            <Icon
              name={"heart"}
              onClick={handleIconClick}
              isActive={isActive}
            />
          </div>
        </div>
        <div className={styles.controls}>
          <div className={styles.controlBTN}>
            <img
              src={getIconPath('previous')}
              alt="Previous"
              onClick={handleSkipBackward}
            />
          </div>
          <div className={styles.controlBTN} onClick={handlePlayPause}>
            {isPlaying ? (
              <img src={getIconPath('pause')} alt="Pause" />
            ) : (
              <img src={getIconPath('play')} alt="Play" />
            )}
          </div>
          <div className={styles.controlBTN}>
            <img
              src={getIconPath('next')}
              alt="Next"
              onClick={handleSkipForward}
            />
          </div>
        </div>
        <div className={styles.iconContainer}>
          <div className={styles.scroll}>
            <div className={`${styles.current} ${themeColor === 'light' ? styles.lightCurrent : ''}`}>
              <span>{formatTime(currentTrackTime)}</span>
            </div>
            <input
              type="range"
              className={styles.playInput}
              min="0"
              value={currentTrackTime}
              onChange={handleTimeChange}
            />
          </div>
          <div className={styles.voiceControl}>
            <div className={styles.volume}>
              <div className={styles.voice}></div>
              <Slider
                onChange={handleMusicVolumeChange}
                className={styles.inputRadio2}
                value={musicVolume}
                disabled={disabled}
              />
            </div>
            <div className={styles.switchBox}>
              <div className={styles.refresh}></div>
              <div className={styles.shuffle}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</>

  );


}


