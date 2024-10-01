import React, { useState, useEffect } from 'react';
import styles from './LightDark.module.scss';
import Icon from '../Icon/Icon';
import { setCookie } from '../../helper/cookie';

const LightDark = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    setCookie("theme", isDarkMode ? 'dark' : 'light',6)
  }, [isDarkMode]);

  const handleToggle = (mode: 'light' | 'dark') => {
    setIsDarkMode(mode === 'dark');
  };

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.darkModeActive : styles.lightModeActive}`}>
      <div
        className={`${styles.light} ${isDarkMode ? styles.noContainer : styles.active}`}
        onClick={() => handleToggle('light')}
      >
        <Icon name={'light'} isActive={!isDarkMode} />
        <span className={styles.lightText}>Light</span>
      </div>
      <div
        className={`${styles.dark} ${isDarkMode ? styles.active : ''}`}
        onClick={() => handleToggle('dark')}
      >
        <Icon name={'dark'} isActive={isDarkMode} />
        <span>Dark</span>
      </div>
    </div>
  );
};

export default LightDark;
