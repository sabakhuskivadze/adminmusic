"use client";
import React, { useState, useEffect } from 'react';
import styles from './Aside.module.scss';
import Icon from '../Icon/Icon';
import MenuItem from '../MenuItem/MenuItem';
import LightDark from '../LightDark/LightDark';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

export const getCookie = (key: string) => {
  return Cookie.get(key);
};

const AsideMenu = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [themeColor, setThemeColor] = useState<string | undefined>(getCookie("theme")); // Store theme in state
  const router = useRouter();

  const handleMenuItemClick = (name: string, route: string) => {
    setActiveItem(name);
    router.replace(route);
  };

  useEffect(() => {
    const updateTheme = () => {
      const newTheme = getCookie("theme");
      setThemeColor(newTheme);
    };

    updateTheme();
    const themeInterval = setInterval(updateTheme, 0); // Set reasonable interval (1 second)

    return () => clearInterval(themeInterval);
  }, []);


  return (
    <div className={`${styles.aside} ${themeColor === 'dark' ? styles.darkAside : ''}`}>
      <div className={styles.siderContent}>
        <div className={styles.logo}>
          <Icon width='72px' name={"FAZER"} isActive={false} onClick={() => {}} />
        </div>
        <div className={styles.menuItems}>
        <MenuItem
  name={"Artists"}
  isActive={activeItem === "Artists"}
  onClick={() => handleMenuItemClick("Artists", "/adminArtist")} // Use relative paths
/>
<MenuItem
  name={"Users"}
  isActive={activeItem === "Users"}
  onClick={() => handleMenuItemClick("Users", "/userList")} // Use relative paths
/>

<MenuItem
  name={"Music"}
  isActive={activeItem === "Musics"}
  onClick={() => handleMenuItemClick("Musics", "/adminMusic")} // Use relative paths
/>

<MenuItem
  name={"Albums"}
  isActive={activeItem === "Albums"}
  onClick={() => handleMenuItemClick("Albums", "/adminAlbum")} // Use relative paths
/>



        </div>
      </div>
      
      <div className={styles.lightDarkContainer}>
        <LightDark />
      </div>
    </div>
  );
};

export default AsideMenu;
