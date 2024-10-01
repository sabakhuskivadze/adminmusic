"use client"
import { useState, useEffect } from "react";
import { getCookie } from "../Aside/Aside";
import Icon from "../Icon/Icon";
import styles from "./Header.module.scss";
interface Props{
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}
const Header = (props: Props) => {
  const [themeColor, setThemeColor] = useState<string | null>(getCookie("theme") ?? null);

  useEffect(() => {
    const updateTheme = () => {
      const newTheme = getCookie("theme") ?? null;
      setThemeColor(newTheme);
    };

    updateTheme();

    const themeInterval = setInterval(updateTheme, 0);

    return () => clearInterval(themeInterval);
  }, []);

  return (
    <div className={`${styles.header} ${themeColor === 'dark' ? styles.darkHeader : ''}`}>
      <div className={styles.headerContent}>
        <div className={styles.arrowContainer}>
          <Icon height={"40px"} width={"40px"} name={"Arrow"} isActive={false} onClick={() => {}} />
          <Icon height={"40px"} width={"40px"} name={"rightArr"} isActive={false} onClick={() => {}} />
        </div>

        <div className={styles.searchContainer}>
          <Icon name={"searchIcon"} isActive={false} onClick={() => {}} />
          <input onChange={props.onchange} className={styles.noBorder} placeholder="search" />
        </div>
      </div>
    </div>
  );
}

export default Header;