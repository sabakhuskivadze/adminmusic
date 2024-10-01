"use client";
import { message, Space } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Aside, { getCookie } from '../Components/Aside/Aside';
import Icon from '../Components/Icon/Icon';
import styles from './adminAlbum.module.scss';
import Input from '../Components/Input/input';
import Button from '../Components/Button/Button';
import { Switch } from 'antd';

type Artist = {
    id: number;
    firstName: string;
    lastName: string;
    biography: string;
  };
export default function AdminAlbum() {
    const [artistName, setArtistName] = useState("");
    const [artistLastname, setArtistLastname] = useState("");
    const [artistMusicIds, setArtistMusicIds] = useState("");
    const [artistAlbumId, setArtistAlbumId] = useState("");
    const [themeColor, setThemeColor] = useState<string | null>(getCookie("theme") ?? null);
    const [albumTitle, setAlbumTitle] = useState<string>('');
    const [releaseDate1, setReleaseDate1] = useState<string>('');
    const [artistId, setArtistId] = useState<string>('');
    const [musicId, setMusicId] = useState<string>('');
    const [messageApi, contextHolder] = message.useMessage();
    const [artistBiography, setArtistBiography] = useState("");
    const [emails, setEmails] = useState("");
    const [releaseDate, setReleaseDate] = useState('');
    const [switchChecked, setSwitchChecked] = useState(false);
    const [showAddArtist, setShowAddArtist] = useState(false);
    const [listArtist, setListArtist] = useState(true);
    const [getData, setGetData] = useState<Artist[]>([]);
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [showList, setShowList] = useState(true)
    const [showAdd, setShowAdd] = useState(false)
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
    const firstname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setArtistName(e.target.value);
      };
    
      const lastname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setArtistLastname(e.target.value);
      };
    
      const email = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmails(e.target.value);
      };

      const biographyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setArtistBiography(e.target.value);
      };
    
      const albumname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAlbumTitle(e.target.value);
      };
    
      const releaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReleaseDate(e.target.value);
      };
    
      const onChange = (checked: boolean) => {
        setSwitchChecked(checked);
      };
    return (
        <>
            {contextHolder}
            {showList && (
        <div className={styles.mainContent}>
          <Aside />
          <div className={`${styles.static} ${themeColor === 'dark' ? styles.darkStatic : ''}`}>
            <div className={styles.headerAdmin}>
              <div className={styles.containerIcon}>
                <Icon height={"32px"} width={"32px"} name={"Arrow"} isActive={false} onClick={() => { }} />
                <Icon height={"32px"} width={"32px"} name={"rightArr"} isActive={false} onClick={() => { }} />
              </div>
              <p className={styles.HeaderTitle}>Add Artists</p>
            </div>
            <div className={styles.line}></div>
            <div className={styles.text}>
              <span>First Name</span>
              <Input
                disabled={switchChecked}
                onchange={firstname}
                type="text"
                placeholder=""
                mode="white"
                state="neutral"
              />
              <span>Last Name</span>
              <Input
                disabled={switchChecked}
                onchange={lastname}
                type="text"
                placeholder=""
                mode="white"
                state="neutral"
              />
              <span>Email</span>
              <Input
                disabled={switchChecked}
                onchange={email}
                type="text"
                placeholder=""
                mode="white"
                state="neutral"
              />
              <span>User</span>
              <Input
                disabled={switchChecked}
                type="text"
                placeholder=""
                mode="white"
                state="neutral"
              />
              <span>Biography</span>
              <textarea 
  onChange={biographyChange} 
  disabled={switchChecked} 
  className={styles.BiographyText} 
  cols={30} 
  rows={60}
/>

              <Switch onChange={onChange} />
              <div className={styles.img}>
                <input type="file" />
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
                  </div>
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
      )}
         {showAdd && (   <div className={styles.mainContent}>
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
            </div>)}
        </>
    );
}
