"use client"
import { message, Space } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Aside, { getCookie } from '../Components/Aside/Aside';
import Icon from '../Components/Icon/Icon';
import styles from './adminMusic.module.scss'
import Cookies from "js-cookie";
import Input from '../Components/Input/input'
import Button from '../Components/Button/Button'
interface MusicData {
    id: string; 
    name: string;
    createdAt: string;
}

export default function AdminMusic() {
    const [albumTitle, setAlbumTitle] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [data1, setData1] = useState<MusicData[]>([]);
    const [search123, setSearch1] = useState('');
    const [musicUrl, setMusicUrl] = useState('');
    const [artistId, setArtistId] = useState('');
    const [showList, setShowList] = useState(true)
    const [artistImage, setArtistImage] = useState<File | null>(null); 
  
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setArtistImage(e.target.files[0]); // Store the selected file
      }
    };

    const albumname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAlbumTitle(e.target.value);
    };

    const albumurl = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMusicUrl(e.target.value);
    };

    const artistIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setArtistId(e.target.value);
    };
    const suggest = () => {
        const userToken = getCookie("userToken");

        // Step 1: Post the album information
        axios.post(
            "https://music-back-1s59.onrender.com/music",
            {
                name: albumTitle,
                url: musicUrl,
                artistId: Number(artistId),
            },
            {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            }
        )
        .then((data) => {
            messageApi.open({
                type: 'success',
                content: 'Music created successfully!',
            });

            // Step 2: If image is selected, upload it
            if (artistImage) {
                const formData = new FormData();
                formData.append("file", artistImage); // Append the file to FormData

                axios.post(
                  `https://music-back-1s59.onrender.com/file?musicIds=${data.data.id}`, 
                  formData, 
                  {
                    headers: {
                      Authorization: `Bearer ${userToken}`,
                      'Content-Type': 'multipart/form-data', // Important for file upload
                    },
                  }
                )
                .then(() => {
                  messageApi.open({
                    type: 'success',
                    content: 'Image uploaded successfully!',
                  });
                })
                .catch(() => {
                  messageApi.error({
                    type: 'error',
                    content: 'Image upload failed!',
                  });
                });
              }
        })
        .catch(() => {
            messageApi.error({
                type: 'error',
                content: 'Failed to create music!',
            });
        });
    };


    useEffect(() => {
        const userToken = Cookies.get("userToken");
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
    }, []);

    const searchArtist1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch1(e.target.value);
    };

    const click1 = () => {
        setShowList(false);
    };
    return (
        <>
            {contextHolder}
            {showList && (
                <div className={styles.mainContent}>
                    <Aside />
                    <div className={`${styles.static}`}>
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
                    <div className={`${styles.static}`}>
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
                                    <input type="file" onChange={handleFileChange} />
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