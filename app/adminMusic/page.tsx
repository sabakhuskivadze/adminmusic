"use client"
import { message, Switch, Space } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Aside, { getCookie } from '../Components/Aside/Aside';
import Icon from '../Components/Icon/Icon';
import styles from './adminMusic.module.scss'
import Cookies from "js-cookie";
import Input from '../Components/Input/input'
import Button from '../Components/Button/Button'
export default function AdminMusic() {
    const [themeColor, setThemeColor] = useState(getCookie("theme") || "");
    const [artistName, setArtistName] = useState("");
    const [artistLastname, setArtistLastname] = useState("");
    const [artistBiography, setArtistBiography] = useState("");
    const [emails, setEmails] = useState("");
    const [albumTitle, setAlbumTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [switchChecked, setSwitchChecked] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [showAddArtist, setShowaddArtist] = useState(false);
    const [listArtist, setListArtist] = useState(true);
    const [getData, setGetData] = useState([]);
    const [search123, setSearch1] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [musicUrl, setMusicUrl] = useState('');
    const [artistId, setArtistId] = useState('');
    const [showList, setShowList] = useState(true);
    const [showAdd, setShowAdd] = useState(false);
    const [data1, setData1] = useState([]);

    useEffect(() => {
        const updateTheme = () => {
            const newTheme = getCookie("theme");
            setThemeColor(String(newTheme));
        };

        updateTheme();

        const themeInterval = setInterval(updateTheme, 0); // Adjust interval as needed

        return () => clearInterval(themeInterval);
    }, []);


    const albumname = (e: any) => {
        setAlbumTitle(e.target.value)
    }



    console.log(artistName);



    const biographyChange = (e: any) => {
        setArtistBiography(e.target.value)
    }

 




    useEffect(() => {
        const userToken = Cookies.get("userToken");

        axios.get('https://music-back-1s59.onrender.com/artist', {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        }).then((r) => {
            setGetData(r.data)
        })
    }, [])

    const click = () => {
        setShowaddArtist(true)
        setListArtist(false)
    }

    const albumurl = (e: any) => {
        setMusicUrl(e.target.value)
    }

    const artistIdChange = (e: any) => {
        setArtistId(e.target.value)
    }

    const suggest = () => {
        const userToken = getCookie("userToken");
        axios.post(
            "https://music-back-1s59.onrender.com/music",
            {
                name: albumTitle,
                url: musicUrl,
                artistId: Number(artistId)
            },
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }

        )
            .then((data) => {
                console.log(data);
                messageApi.open({
                    type: 'success',
                    content: 'წარმატებით შექიმნა!',
                });
            })
            .catch((error) => {
                messageApi.error({
                    type: 'error',
                    content: 'რატომ გავიხადე?',
                });;
            });

    }

    useEffect(() => {
        if (typeof window !== "undefined") {
        const userToken = Cookies.get("userToken") ?? null;

        if (userToken) {
            axios.get('https://music-back-1s59.onrender.com/music', {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
                .then((response) => {
                    setData1(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching users:', error);
                });
        }
    }
    }, []);

    const searchArtist1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch1(e.target.value);
    };

    const click1 = () => {
        setShowList(false);
        setShowAdd(true);
    };
    return (
        <>
            {contextHolder}
            {showList && (
                <div className={styles.mainContent}>
                    <Aside />
                    <div className={`${styles.static} ${themeColor === 'dark' ? styles.darkStatic : ''}`}>
                        <div className={styles.container}>
                            <div className={styles.headerAdmin}>
                                <p className={styles.HeaderTitle}>Music</p>
                            </div>
                            <div className={styles.contaienrGroup}>
                                <button onClick={click1} className={styles.btn1}>   <Icon height={"24px"} width={"24px"} name={"add"} isActive={false} onClick={() => { }} />Add Artists</button>
                                <div className={styles.search}>
                                    <div className={styles.icon}>
                                        <Icon name={"searchIcon"} isActive={false} />
                                    </div>


                                    <input
                                        onChange={searchArtist1}
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
                                {data1.filter(item =>
                                    item.name.toLowerCase().includes(search123.toLowerCase())
                                ).map((item, index) => (
                                    <div className={styles.ArtistInfo} key={index}>
                                        <div className={styles.items}>
                                            <p>{item.name}</p>
                                            <p>{"active"}</p>
                                            <p>{item.id}</p>
                                            <p>{item.createdAt}</p>
                                            <p className={styles.Active}>{'Active'}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            )}
            {(
                <div className={styles.mainContent}>
                    <Aside />
                    <div className={`${styles.static} ${themeColor === 'dark' ? styles.darkStatic : ''}`}>
                        <div className={styles.headerAdmin}>
                            <div className={styles.containerIcon}>
                                <Icon height={"32px"} width={"32px"} name={"Arrow"} isActive={false} onClick={() => { }} />
                                <Icon height={"32px"} width={"32px"} name={"rightArr"} isActive={false} onClick={() => { }} />
                            </div>
                            <p className={styles.HeaderTitle}>Add Musics</p>
                        </div>
                        <div className={styles.line}></div>
                        <div className={styles.text}>

                            <span className={styles.head}>Add Musics</span>
                            <div className={styles.line}></div>
                            <div className={styles.containerMusic}>
                                <div className={styles.album}>
                                    <span>Music name</span>
                                    <Input
                                        onchange={albumname}
                                        type="text"
                                        placeholder=""
                                        mode="white"
                                        state="neutral"
                                    />
                                    <span>Music url</span>
                                    <Input
                                        onchange={albumurl}
                                        type="text"
                                        placeholder=""
                                        mode="white"
                                        state="neutral"
                                    />
                                    <span>music artistId</span>
                                    <Input
                                        onchange={artistIdChange}
                                        type="number"
                                        placeholder=""
                                        mode="white"
                                        state="neutral"
                                    />

                                    <div className={styles.img}>

                                        <div className={styles.imageText}>
                                            <span className={styles.iimg}>Trakis Scott</span>
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
                                                    text="view"
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
            )}
        </>
    )
}