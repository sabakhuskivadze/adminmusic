"use client";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import styles from './userList.module.scss';
import axios from 'axios';
import Aside, { getCookie } from '../Components/Aside/Aside';
import Icon from '../Components/Icon/Icon';

export default function UserList() {
    const [themeColor, setThemeColor] = useState<string | null>(getCookie("theme") ?? null);
    const [getData, setGetData] = useState<any[]>([]); // Adjust type as needed
    const [search, setSearch] = useState("");

    useEffect(() => {
        const updateTheme = () => {
            const newTheme = getCookie("theme") ?? null;
            setThemeColor(newTheme);
        };

        updateTheme();
        const themeInterval = setInterval(updateTheme, 5000);

        return () => clearInterval(themeInterval);
    }, []);

    useEffect(() => {
        const userToken = Cookies.get("userToken") ?? null;

        if (userToken) {
            axios.get('https://music-back-1s59.onrender.com/users', {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
            .then((response) => {
                setGetData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
        }
    }, []);

    const searchArtist = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <div className={styles.mainContent}>
            <Aside />
            <div className={`${styles.static} ${themeColor === 'dark' ? styles.darkStatic : ''}`}>
                <div className={styles.container}>
                    <div className={styles.headerAdmin}>
                        <p className={styles.HeaderTitle}>Users</p>
                    </div>
                    <div className={styles.contaienrGroup}>
                        <div className={styles.search}>
                            <div className={styles.icon}>
                                <Icon name={"searchIcon"} isActive={false} />
                            </div>
                            <input 
                                onChange={searchArtist} 
                                placeholder='Search' 
                                type="text" 
                                className={styles.artistSearch} 
                            />
                        </div>
                    </div>
        
                </div>
                <div className={styles.listArtist}>
                        <div className={styles.list}>
                            <div className={styles.listInfo}>
                                <div className={styles.items}>
                                    <p>Name</p>
                                    <p>Email</p>
                                    <p>UserId</p>
                                    <p>Last login</p>
                                    <p>Status</p>
                                </div>
                            </div>
                            {getData.filter(item => 
                                item.name.toLowerCase().includes(search.toLowerCase())
                            ).map((item, index) => (
                                 <div className={styles.ArtistInfo} key={index}>
                                    <div className={styles.items}>
                                        <p>{item.name}</p>
                                        <p>{item.email}</p>
                                        <p>{item.id}</p>
                                        <p>{item.lastLogin}</p>
                                        <p className={styles.Active}>{'Active'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
            </div>
            
        </div>
    );
}
