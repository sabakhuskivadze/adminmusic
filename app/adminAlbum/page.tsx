"use client";
import { message, Space } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Aside, { getCookie } from '../Components/Aside/Aside';
import Icon from '../Components/Icon/Icon';
import styles from './adminAlbum.module.scss';
import Input from '../Components/Input/input';
import Button from '../Components/Button/Button';

export default function AdminAlbum() {
    const [themeColor, setThemeColor] = useState<string | null>(getCookie("theme") ?? null);
    const [albumTitle, setAlbumTitle] = useState<string>('');
    const [releaseDate1, setReleaseDate1] = useState<string>('');
    const [artistId, setArtistId] = useState<string>('');
    const [musicId, setMusicId] = useState<string>('');
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const updateTheme = () => {
            const newTheme = getCookie("theme");
            setThemeColor(newTheme ?? null);
        };

        updateTheme();
        const themeInterval = setInterval(updateTheme, 1000); // Adjust interval as needed
        return () => clearInterval(themeInterval);
    }, []);

    const suggest = async () => {
        // Check if we are in the browser before accessing localStorage
        if (typeof window !== "undefined") {
            const userToken = localStorage.getItem("token");
            try {
                await axios.post(
                    "https://music-back-1s59.onrender.com/album",
                    {
                        title: albumTitle,
                        releaseDate: releaseDate1,
                        musicIds: [Number(musicId)],
                        artistId: Number(artistId),
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    }
                );

                messageApi.open({
                    type: 'success',
                    content: 'წარმატებით შექიმნა!',
                });
            } catch (error) {
                const errorMessage = 'რატომ გავიხადე?';
                messageApi.error({
                    type: 'error',
                    content: errorMessage,
                });
            }
        }
    };

    return (
        <>
            {contextHolder}
            <div className={styles.mainContent}>
                <Aside />
                <div className={`${styles.static} ${themeColor === 'dark' ? styles.darkStatic : ''}`}>
                    <div className={styles.headerAdmin}>
                        <div className={styles.containerIcon}>
                            <Icon height={"32px"} width={"32px"} name={"Arrow"} isActive={false} onClick={() => { }} />
                            <Icon height={"32px"} width={"32px"} name={"rightArr"} isActive={false} onClick={() => { }} />
                        </div>
                        <p className={styles.HeaderTitle}>Add Albums</p>
                    </div>
                    <div className={styles.line}></div>
                    <div className={styles.text}>
                        <span className={styles.head}>Add Albums</span>
                        <div className={styles.line}></div>
                        <div className={styles.containerMusic}>
                            <div className={styles.album}>
                                <span>Albums name</span>
                                <Input
                                    onchange={(e) => setAlbumTitle(e.target.value)}
                                    type="text"
                                    placeholder=""
                                    mode="white"
                                    state="neutral"
                                />
                                <span>Albums releaseDate</span>
                                <Input
                                    onchange={(e) => setReleaseDate1(e.target.value)}
                                    type="text"
                                    placeholder=""
                                    mode="white"
                                    state="neutral"
                                />
                                <span>Albums artistId</span>
                                <Input
                                    onchange={(e) => setArtistId(e.target.value)}
                                    type="number"
                                    placeholder=""
                                    mode="white"
                                    state="neutral"
                                />
                                <span>Albums musicIds</span>
                                <Input
                                    onchange={(e) => setMusicId(e.target.value)}
                                    type="number"
                                    placeholder=""
                                    mode="white"
                                    state="neutral"
                                />
                                <div className={styles.img}>
                                    <div className={styles.imageText}>
                                        <span className={styles.iimg}>Travis Scott</span>
                                        <span>Profile Photo</span>
                                        <div className={styles.buttons}>
                                            <Button
                                                text="Add"
                                                width="63px"
                                                backgroundColor="#FF5F5F"
                                                borderRadius="5px"
                                                textColor="#FFFFFF"
                                                border="none"
                                                padding='4px 16px'
                                            />
                                            <Button
                                                text="View"
                                                width="63px"
                                                backgroundColor="white"
                                                borderRadius="5px"
                                                textColor="#898989"
                                                border="none"
                                                padding='4px 16px'
                                            />
                                            <Space>
                                                <Button
                                                    click={suggest}
                                                    text="Suggest"
                                                    width="90px"
                                                    backgroundColor="#FF5F5F"
                                                    borderRadius="5px"
                                                    textColor="#FFFFFF"
                                                    border="none"
                                                    padding='4px 16px'
                                                />
                                            </Space>
                                        </div>
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
