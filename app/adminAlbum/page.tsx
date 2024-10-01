"use client";
import { message, Space } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Aside, { getCookie } from '../Components/Aside/Aside';
import Icon from '../Components/Icon/Icon';
import styles from './adminAlbum.module.scss';
import Input from '../Components/Input/input';
import Button from '../Components/Button/Button';
import Cookies from "js-cookie";

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

  useEffect(() => {
    const userToken = Cookies.get("userToken") ?? null;

    if (userToken) {
      axios.get('https://music-back-1s59.onrender.com/album', {
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

  const click = () => {
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
                <p className={styles.HeaderTitle}>Album</p>
              </div>
              <div className={styles.contaienrGroup}>
                <button onClick={click} className={styles.btn1}>   <Icon height={"24px"} width={"24px"} name={"add"} isActive={false} onClick={() => { }} />Add Artists</button>
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
                  item.title.toLowerCase().includes(search.toLowerCase())
                ).map((item, index) => (
                  <div className={styles.ArtistInfo} key={index}>
                    <div className={styles.items}>
                      <p>{item.title}</p>
                      <p>{item.releaseDate}</p>
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
      {showAdd && (<div className={styles.mainContent}>
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
