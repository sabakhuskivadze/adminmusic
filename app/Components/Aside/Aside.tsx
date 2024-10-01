"use client";
import React, { useState } from 'react';
import styles from './Aside.module.scss';
import Icon from '../Icon/Icon';
import MenuItem from '../MenuItem/MenuItem';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

export const getCookie = (key: string) => {
  return Cookie.get(key);
};

const AsideMenu = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const router = useRouter();

  const handleMenuItemClick = (name: string, route: string) => {
    setActiveItem(name);
    router.replace(route);
  };



  return (
    <div className={`${styles.aside}`}>
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
      
    </div>
  );
};

export default AsideMenu;
