// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import styles from "./ComputerPlayer.module.scss";
// import { Slider } from "antd";
// import songs from "@/public/Consts/songs"; // Assuming you have a songs array
// import Icon from "../Icon/Icon";
// import { getCookie } from "../Aside/Aside";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useCallback } from "react";
// import Image from 'next/image';

// export default function Player() {
//   const [disabled, setDisabled] = useState(false);
//   const [musicVolume, setMusicVolume] = useState(50); // Music volume state
//   const [voiceVolume, setVoiceVolume] = useState(50); // Voice volume state
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [shuffle, setShuffle] = useState(false);
//   const [currentSongId, setCurrentSongId] = useState(1); // Current song ID
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const [currentTrackTime, setCurrentTrackTime] = useState(0);
//   const [songEnded, setSongEnded] = useState(false);
//   const [isActive, setIsActive] = useState(false);
//   const [data, setData] = useState<[]>([]);
//   const currentSong = songs.find((song) => song.id === currentSongId);

//   // Load saved music and voice volume from local storage
//   useEffect(() => {
//     const savedMusicVolume = localStorage.getItem("music");
//     const savedVoiceVolume = localStorage.getItem("voice");
//     if (savedMusicVolume) setMusicVolume(Number(savedMusicVolume));
//     if (savedVoiceVolume) setVoiceVolume(Number(savedVoiceVolume));
//   }, []);

//   // Load and play the current song
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (audio && currentSong) {
//       audio.src = currentSong.url;
//       if (isPlaying) {
//         audio.play();
//       } else {
//         audio.pause();
//       }
//     }
//   }, [currentSong, isPlaying]);

//   // Update track time every second while playing
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (audioRef.current && isPlaying) {
//         setCurrentTrackTime(audioRef.current.currentTime);
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [isPlaying]);

//   // Handle when the song ends
//   useEffect(() => {
//     const handleSongEnd = () => setSongEnded(true);
//     const audio = audioRef.current;

//     if (audio) {
//       audio.addEventListener("ended", handleSongEnd);
//       return () => audio.removeEventListener("ended", handleSongEnd);
//     }
//   }, [currentSongId]);

//   // Skip to the next song if the current one ends
//   // Include handleSkipForward here
//   ; // Added handleSkipForward

//   const handlePlayPause = () => {
//     setIsPlaying(!isPlaying);
//   };
//   const handleSkipForward = useCallback(() => {
//     setCurrentSongId((prevId) => {
//       let nextId;
//       if (shuffle) {
//         nextId = songs[Math.floor(Math.random() * songs.length)].id;
//         while (nextId === prevId && songs.length > 1) {
//           nextId = songs[Math.floor(Math.random() * songs.length)].id;
//         }
//       } else {
//         const currentIndex = songs.findIndex((song) => song.id === prevId);
//         nextId = songs[(currentIndex + 1) % songs.length].id;
//       }
//       if (audioRef.current) {
//         audioRef.current.currentTime = 0;
//         audioRef.current.play();
//       }
//       return nextId;
//     });
//   }, [shuffle]); 

//   const handleSkipBackward = () => {
//     setCurrentSongId((prevId) => {
//       const currentIndex = songs.findIndex((song) => song.id === prevId);
//       const newId = songs[(currentIndex - 1 + songs.length) % songs.length].id;
//       if (audioRef.current) {
//         audioRef.current.currentTime = 0;
//         audioRef.current.play();
//       }
//       return newId;
//     });
//   };

//   useEffect(() => {
//     if (songEnded) {
//       handleSkipForward();
//       setSongEnded(false);
//     }
//   }, [songEnded, handleSkipForward]);

//   // Debounce function to handle slider changes efficiently
//   const debounce = (func: Function, delay: number) => {
//     let timer: NodeJS.Timeout;
//     return (...args: any) => {
//       clearTimeout(timer);
//       timer = setTimeout(() => func(...args), delay);
//     };
//   };

//   const handleTimeChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
//     const time = Number(e.target.value);
//     setCurrentTrackTime(time);
//     if (audioRef.current) {
//       audioRef.current.currentTime = time;
//     }
//   }, 300) 

//   const handleShuffle = () => {
//     setShuffle(!shuffle);
//   };

//   const handleRepeat = () => {
//     if (audioRef.current) {
//       audioRef.current.currentTime = 0;
//       audioRef.current.play();
//     }
//   };

//   const handleMusicVolumeChange = (value: number) => {
//     setMusicVolume(value);
//     localStorage.setItem("music", value.toString());
//     if (audioRef.current) {
//       audioRef.current.volume = value / 100;
//     }
//   };

//   const handleVoiceVolumeChange = (value: number) => {
//     setVoiceVolume(value);
//     localStorage.setItem("voice", value.toString());
//   };

//   const handleIconClick = () => {
//     setIsActive(!isActive);
//     const userToken = Cookies.get("userToken");

//     if (!isActive && userToken) {
//       axios
//         .post(
//           "https://music-back-1s59.onrender.com/playlist",
//           { name: "s", description: "s", musicIds: [1] },
//           { headers: { Authorization: `Bearer ${userToken}` } }
//         )
//         .catch(() => {
//           console.log("Error adding to playlist");
//         });
//     }
//   };

//   // Fetch user playlists from the backend
//   useEffect(() => {
//     const userToken = Cookies.get("userToken");

//     axios
//       .get("https://music-back-1s59.onrender.com/users/me", {
//         headers: { Authorization: `Bearer ${userToken}` },
//       })
//       .then((response) => {
//         if (Array.isArray(response.data.playlists)) {
//           setData(response.data.playlists);
//         } else {
//           console.warn("Unexpected data structure:", response.data);
//           setData([]);
//         }
//       })
//       .catch(() => {
//         console.log("Error fetching user data");
//       });
//   }, []);

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   const [themeColor, setThemeColor] = useState<string | null>(localStorage.getItem("theme"));

//   useEffect(() => {
//     const updateTheme = () => {
//       const newTheme = localStorage.getItem("theme");
//       setThemeColor(newTheme);
//     };
  
//     // Initial theme setup
//     updateTheme();
  
//     // Event listener for storage changes
//     const handleStorageChange = (event: StorageEvent) => {
//       if (event.key === "theme") {
//         updateTheme();
//       }
//     };
  
//     window.addEventListener("storage", handleStorageChange);
  
//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);
  
//   const getIconPath = (iconName: string) => {
//     return `icons/${iconName}${themeColor === "light" ? "Light" : ""}.svg`; // Fixed template literal
//   };

//   return (
// <>
// <div className={`${styles.computerPlayer} ${themeColor === 'light' ? styles.lightPlayer : ''}`}>
//   <audio ref={audioRef} />
//   <div className={styles.Player}>
//     <div className={styles.container}>
//       <div className={styles.textContainer}>
//         <div className={styles.textGrid}>
//           {/* Add the src attribute to the img element */}
//           <img className={styles.img} src={currentSong?.coverUrl || '/path/to/default/image.png'} alt={currentSong?.title} />
//           <div className={styles.artistInfo}>
//             <h3 className={`${styles.Text} ${themeColor === 'light' ? styles.lightText : ''}`}>{currentSong?.title || 'Unknown Title'}</h3>
//             <p className={styles.Text2}>{currentSong?.artist || 'Unknown Artist'}</p>
//           </div>
//           <div className={styles.icon}>
//             <Icon
//               name={"heart"}
//               onClick={handleIconClick}
//               isActive={isActive}
//             />
//           </div>
//         </div>
//         <div className={styles.controls}>
//           <div className={styles.controlBTN}>
//             <img
//               src={getIconPath('previous')}
//               alt="Previous"
//               onClick={handleSkipBackward}
//             />
//           </div>
//           <div className={styles.controlBTN} onClick={handlePlayPause}>
//             {isPlaying ? (
//               <img src={getIconPath('pause')} alt="Pause" />
//             ) : (
//               <img src={getIconPath('play')} alt="Play" />
//             )}
//           </div>
//           <div className={styles.controlBTN}>
//             <img
//               src={getIconPath('next')}
//               alt="Next"
//               onClick={handleSkipForward}
//             />
//           </div>
//         </div>
//         <div className={styles.iconContainer}>
//           <div className={styles.scroll}>
//             <div className={`${styles.current} ${themeColor === 'light' ? styles.lightCurrent : ''}`}>
//               <span>{formatTime(currentTrackTime)}</span>
//             </div>
//             <input
//               type="range"
//               className={styles.playInput}
//               min="0"
//               value={currentTrackTime}
//               onChange={handleTimeChange}
//             />
//           </div>
//           <div className={styles.voiceControl}>
//             <div className={styles.volume}>
//               <div className={styles.voice}></div>
//               <Slider
//                 onChange={handleMusicVolumeChange}
//                 className={styles.inputRadio2}
//                 value={musicVolume}
//                 disabled={disabled}
//               />
//             </div>
//             <div className={styles.switchBox}>
//               <div className={styles.refresh}></div>
//               <div className={styles.shuffle}></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// </>

//   );


// }



export default function Player() {
  return(
    <>
    
    </>
  )
}