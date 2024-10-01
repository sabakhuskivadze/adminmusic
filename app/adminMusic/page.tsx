"use client"
import { message, Switch, Space } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Aside, { getCookie } from '../Components/Aside/Aside';
import Icon from '../Components/Icon/Icon';
import TopChart from '../Components/TopChart/TopChart';
import styles from './adminMusic.module.scss'
import Cookies from "js-cookie";
import Input from '../Components/Input/input'
import Button from '../Components/Button/Button'
export default function AdminMusic() {
    const [themeColor, setThemeColor] = useState(getCookie("theme") || "");
    const [artistName, setArtistName] = useState("")
    const [artistLastname, setArtistLastname] = useState("")
    const [artistBiography, setArtistBiography] = useState("")
    const [emails, setEmails] = useState("")
    const [albumTitle, setAlbumTitle] = useState('')
    const [releaseDate, setReleaseDate] = useState('')
    const [switchChecked, setSwitchChecked] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [showAddArtist, setShowaddArtist] = useState(false)
    const [listArtist, setListArtist] = useState(true)
    const [getData, setGetData] = useState([])
    const [search, setSearch] = useState('')
    const [searchData, setSearchData] = useState([])
    const [musicUrl, setMusicUrl ] = useState('')
    const [artistId, setArtistId] = useState('')
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

    const searchArtist = (e: any) => {
        setSearch(e.target.value)
    }

    console.log(search);


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

   const albumurl = (e:any) => {
    setMusicUrl(e.target.value)
   } 

   const artistIdChange = (e:any) => {
    setArtistId(e.target.value)
   }

   const suggest = () => {
    const userToken = localStorage.getItem("token");
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
    return (
        <>
            {contextHolder}
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