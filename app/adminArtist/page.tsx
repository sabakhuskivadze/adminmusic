"use client"
import styles from './artist.module.scss'
import { useState, useEffect } from 'react'
import { Switch } from 'antd';
import Cookies from "js-cookie";
import axios from 'axios'
import { message, Space } from 'antd';
import Aside, { getCookie } from '../Components/Aside/Aside';
import Icon from '../Components/Icon/Icon';
import Input from '../Components/Input/input';
import Button from '../Components/Button/Button';
type Artist = {
  id: number;
  firstName: string;
  lastName: string;
  biography: string;
  deletedAt?: string | null;
};

enum active {
  Active = 'Active',
  Block = 'Block'
}

export default function ArtistAdd() {
  const [themeColor, setThemeColor] = useState(getCookie("theme") || "");
  const [artistName, setArtistName] = useState("");
  const [artistLastname, setArtistLastname] = useState("")
  const [artistBiography, setArtistBiography] = useState("");
  const [switchChecked, setSwitchChecked] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [showAddArtist, setShowAddArtist] = useState(false);
  const [listArtist, setListArtist] = useState(true);
  const [getData, setGetData] = useState<Artist[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const updateTheme = () => {
      const newTheme = getCookie("theme") || 'null'; // Provide fallback value
      setThemeColor(String(newTheme));
    };

    updateTheme();

    const themeInterval = setInterval(updateTheme, 0); // Adjust interval as needed

    return () => clearInterval(themeInterval);
  }, []);

  const firstname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArtistName(e.target.value);
  };

  const lastname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArtistLastname(e.target.value);
  };



  const handleStatusClick = (artistId: number, deletedAt?: string | null) => {
    const userToken = Cookies.get("userToken");
    
    if (deletedAt) {
        // Unblocking the user
        axios.patch(`https://music-back-1s59.onrender.com/artist/restore/${artistId}`, {
            deletedAt: null // Unblocking the user
        }, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            }
        }).then((response) => {
            console.log(response.data);
            // Update the user status in local state
            setGetData(prevData =>
                prevData.map(user =>
                    user.id == artistId ? { ...user, deletedAt: null } : user
                )
            );

        }).catch((error) => {
            console.error('Error unblocking user:', error);
        });


    } else {
        // Deleting the user
        axios.delete(`https://music-back-1s59.onrender.com/artist/${artistId}`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        })
        .then((response) => {
            console.log(response.data);
            // Optionally, update the state to reflect the deletion
            setGetData(prevData => prevData.filter(user => user.id !== artistId));
            if(typeof window !== 'undefined') {
              window.location.reload();
            }
        })
        .catch((error) => {
            console.error('Error deleting user:', error);
        });


    }
};


  const onChange = (checked: boolean) => {
    setSwitchChecked(checked);
  };

  const suggest = () => {
    const userToken = getCookie("userToken")
    axios.post(
      "https://music-back-1s59.onrender.com/artist",
      {
        firstName: artistName,
        lastName: artistLastname,
        biography: artistBiography
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    )
      .then(() => {
        messageApi.open({
          type: 'success',
          content: 'წარმატებით შექიმნა!',
        });
        setTimeout(() => {
          setShowAddArtist(false);
          setListArtist(true);
        }, 2000);
      })
      .catch(() => {
        messageApi.error({
          type: 'error',
          content: 'რატომ გავიხადე?',
        });
      });
  };

  const biographyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setArtistBiography(e.target.value);
  };

  const searchArtist = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const userToken = Cookies.get("userToken");

    axios.get('https://music-back-1s59.onrender.com/artist/admin/get', {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).then((r) => {
      setGetData(r.data);
    });
  }, []);

  const click = () => {
    setShowAddArtist(true);
    setListArtist(false);
  };

  useEffect(() => {
    const userToken = localStorage.getItem("token");

    if (userToken && search) {
      axios.get(`https://music-back-1s59.onrender.com/search/artist?search=${search}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then(() => {

        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            console.log('Unauthorized: Invalid token');
          } else {
            console.log('Error:', error.message);
          }
        });
    }
  }, [search]);

  return (
    <>
      {contextHolder}
      {showAddArtist && (
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
      {listArtist && (
        <div className={styles.mainContent}>
          <Aside />
          <div className={`${styles.static} ${themeColor === 'dark' ? styles.darkStatic : ''}`}>
            <div className={styles.container}>
              <div className={styles.headerAdmin}>
                <div className={styles.containerIcon}>
                  <Icon height={"32px"} width={"32px"} name={"Arrow"} isActive={false} onClick={() => { }} />
                  <Icon height={"32px"} width={"32px"} name={"rightArr"} isActive={false} onClick={() => { }} />
                </div>
                <p className={styles.HeaderTitle}>Artists</p>
              </div>
              <div className={styles.contaienrGroup}>
                <button onClick={click} className={styles.btn1}>   <Icon height={"24px"} width={"24px"} name={"add"} isActive={false} onClick={() => { }} />Add Artists</button>
                <div className={styles.search}>
                  <div className={styles.icon}>
                    <Icon name={"searchIcon"} isActive={false} onClick={function (): void {
                      throw new Error("Function not implemented.");
                    }} />
                  </div>
                  <input onChange={searchArtist} placeholder='Search' type="text" className={styles.artistSearch} />
                </div>
              </div>
            </div>
            <div className={styles.listArtist}>
              <div className={styles.list}>
                <div className={styles.listInfo}>
                  <div className={styles.items}>
                    <p className={styles.listinfoTitle}>Name</p>
                    <p className={styles.listinfoTitle}>Email</p>
                    <p className={styles.listinfoTitle}>User</p>
                    <p className={styles.listinfoTitle}>Profile</p>
                    <p className={styles.listinfoTitle}>Status</p>
                  </div>
                </div>

                {
                  getData.filter((items) =>
                    items.firstName.toLowerCase().includes(search.toLowerCase()) // Case-insensitive search
                  ).map((items, index) => (
                    <div className={styles.ArtistInfo} key={index}> {/* Add key here */}
                      <div className={styles.items}>
                        <p className={styles.itemsText}>{items.firstName}</p>
                        <p className={styles.itemsText}>{`${items.lastName}@gmail.com`}</p>
                        <p className={styles.itemsText}>{String(items.id)}</p>
                        <p className={styles.itemsText}>{items.biography}</p>
                        <p className={items.deletedAt ? styles.Block : styles.Active} onClick={() => handleStatusClick(items.id, items.deletedAt)}>{items.deletedAt ? 'Block' : 'Active'}</p>
                      </div>
                    </div>
                  )

                )

                }


              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}