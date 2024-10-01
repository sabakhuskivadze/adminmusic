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
  const [isAdmin, setIsAdmin] = useState(false);
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

  useEffect(() => {
    const isAdminCookie = Cookie.get("isAdmin");
    if (isAdminCookie === 'admin') {
      setIsAdmin(true);
    }
  }, []);

  return (
    <div className={`${styles.aside} ${themeColor === 'dark' ? styles.darkAside : ''}`}>
      <div className={styles.siderContent}>
        <div className={styles.logo}>
          <Icon name={"FAZER"} isActive={false} onClick={() => {}} />
        </div>
        <div className={styles.menuItems}>
        <MenuItem
                name={"artists"}
                isActive={activeItem === "artists"}
                onClick={() => handleMenuItemClick("artists", "http://localhost:3000/adminArtist")}
              />
              <MenuItem
                name={"Users"}
                isActive={activeItem === "Users"}
                onClick={() => handleMenuItemClick("Users", "http://localhost:3000/userList")}
              />
              <MenuItem
                name={"Album"}
                isActive={activeItem === "Album"}
                onClick={() => handleMenuItemClick("Album", "http://localhost:3000/adminAlbum")}
              />
              <MenuItem
                name={"Music"}
                isActive={activeItem === "Music"}
                onClick={() => handleMenuItemClick("Music", "http://localhost:3000/adminMusic")}
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
