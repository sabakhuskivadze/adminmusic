"use client";
import { message, Space } from 'antd';
import axios from 'axios';
import { useState, useEffect, ReactNode, MouseEvent } from 'react';
import Aside, { getCookie } from '../Components/Aside/Aside';
import Icon from '../Components/Icon/Icon';
import styles from './adminAlbum.module.scss';
import Input from '../Components/Input/input';
import Button from '../Components/Button/Button';
import Cookies from "js-cookie";

type Artist = {
  createdAt: ReactNode;
  releaseDate: ReactNode;
  title: string | null;
  id: number;
  firstName: string;
  lastName: string;
  biography: string;
};

export default function AdminAlbum() {
  const [messageApi, contextHolder] = message.useMessage();
  const [albumTitle, setAlbumTitle] = useState<string>('');
  const [releaseDate1, setReleaseDate1] = useState<string>('');
  const [artistId, setArtistId] = useState<string>('');
  const [getData, setGetData] = useState<Artist[]>([]);
  const [search, setSearch] = useState<string>('');
  const [showList, setShowList] = useState<boolean>(true);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [artistImage, setArtistImage] = useState<File | null>(null);

  const [array, setArray] = useState<string[]>([])



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setArtistImage(e.target.files[0]); // Store the selected file
    }
  };


  const suggest = async () => {
    const userToken = getCookie("userToken");
  
    // Update sendData directly from array

  
    try {
      const { data } = await axios.post(
        "https://music-back-1s59.onrender.com/album",
        {
          title: albumTitle,
          releaseDate: releaseDate1,
          musicIds: array.map(Number), // Pass converted array directly
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
        content: 'წარმატებით შეიქმნა!',
      });
  
      if (artistImage && data?.id) {
        const formData = new FormData();
        formData.append("file", artistImage);
  
        await axios.post(
          `https://music-back-1s59.onrender.com/file?albumId=${data.id}`, // Use albumId instead of artistId
          formData,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        messageApi.open({
          type: 'success',
          content: 'Image uploaded successfully!',
        });
      }
    } catch {
      messageApi.error({
        type: 'error',
        content: 'რატომ გავიხადე?',
      });
    }
  };
  
  

  useEffect(() => {
    const userToken = Cookies.get("userToken") ?? null;

    if (userToken) {
      axios
        .get('https://music-back-1s59.onrender.com/album', {
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

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const inputField = (e.target as HTMLInputElement).previousElementSibling as HTMLInputElement;
    const value = inputField?.value;
  
    if (value) {
      const numValue = Number(value);
      setArray(Array(numValue).fill(''));
    }
  };
  



  const handleMusicIdChange = (index: number, value: string) => {
    const newArray = [...array];
    newArray[index] = value;
    setArray(newArray);
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
                <p className={styles.HeaderTitle}>Album</p>
              </div>
              <div className={styles.contaienrGroup}>
                <button onClick={click} className={styles.btn1}>   <Icon height={"24px"} width={"24px"} name={"add"} isActive={false} onClick={() => { }} />Add album</button>
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
                  item.title?.toLowerCase().includes(search.toLowerCase()) // Use optional chaining to prevent errors
                ).map((item, index) => (
                  <div className={styles.ArtistInfo} key={index}>
                    <div className={styles.items}>
                      <p>{item.title || 'Unknown Title'}</p> {/* Fallback if title is null */}
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
        <div className={`${styles.static}`}>
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
                <input type='number' placeholder="Enter number of Music IDs" className={styles.input}/>
                <input type='submit' onClick={handleClick} className={styles.button} />

                {/* Render input fields based on array length */}
                {array.map((_, index) => (
                  <Input
                    key={index}
                    onchange={(e) => handleMusicIdChange(index, e.target.value)}
                    type="number"
                    placeholder={`Music ID ${index + 1}`}
                    mode="white"
                    state="neutral"
                  />
                ))}


                <div className={styles.img}>
                  <h1>Add photo</h1>
                  <input type="file" onChange={handleFileChange} />
                  <div className={styles.imageText}>
                    <div className={styles.buttons}>
                      <Space>
                        <Button
                          click={suggest}
                          text="Add Album"
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
