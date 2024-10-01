import React from 'react';
import styles from "./MusicListItem.module.scss";
import Image from 'next/image'; // Import Image from next/image

type Props = {
  image: string;
  songName: string;
  artistName: string;
  rank: string;
  button: string;
  onPlay: () => void;
};

const MusicListItem: React.FC<Props> = ({
  image,
  songName,
  artistName,
  rank,
  button,
  onPlay
}) => {
  return (
    <div className={styles.musiclistitem}>
      <Image 
        src={image} 
        alt={`${songName} cover`} 
        className={styles.musicimage} 
        height={176} // Set appropriate height
        width={168}  // Set appropriate width
        layout="intrinsic" // Maintain aspect ratio
      />
      <div className={styles.musicinfo}>
        <h3 className={styles.songname}>{songName}</h3>
        <p className={styles.artistname}>{artistName}</p>
        <p className={styles.rank}>Top {rank}</p>
      </div>
      <button className={styles.playbutton} onClick={onPlay} aria-label={`Play ${songName}`}>
        <Image 
          src={button} 
          alt="Play" 
          className={styles.playicon} 
          height={24} // Set appropriate height for button icon
          width={24}  // Set appropriate width for button icon
          layout="intrinsic" // Maintain aspect ratio
        />
      </button>
    </div>
  );
};

export default MusicListItem;
