"use client";
import React, { useState } from "react";
import styles from "./Login.module.scss";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setCookie } from "../helper/cookie";
import Image from 'next/image'; // Import Image component



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const router = useRouter();

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const authUser = async () => {
    try { 
      const response = await axios.post("https://music-back-1s59.onrender.com/auth/admin", {
        email: email,
        password: password,
      });
      
      setCookie("userToken", response.data.token, 60);
      setCookie("isAdmin", response.data.forToken.role, 60);
      setCookie("lastLogin", response.data.lastLogin, 60);
      localStorage.setItem("token", response.data.token);

      // Redirect after successful login
      router.replace("https://main.d183tg6ytcgr0p.amplifyapp.com");
    } catch (error) { 
      console.error('Login error:', error);
    }
  };

  return (
    <div className={styles.login}>
      <div>
        <Image src="/Images/Login.png" alt="Login" width={500} height={300} />
      </div>
      <div className={styles.loginContainer}>
        <div className={styles.contHeader}>
          <h1>Log In to Your Account</h1>
          <span>Enter the email and password you used to register</span>
        </div>
        <div className={styles.contBody}>
          <div className={styles.loginBody}>
            <div className={styles.emailCont}>
              <span>Email</span>
              <div className={styles.infoHolder}>
                <input
                  onChange={changeEmail}
                  className={styles.input}
                  type="email"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className={styles.passCont}>
              <span>Password</span>
              <div className={styles.infoHolder}>
                <input
                  onChange={changePassword}
                  className={styles.input}
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>
          <div className={styles.passwordOptions}>
            <div className={styles.forgetPassword}>
              <span>Forget Password</span>
            </div>
          </div>
        </div>

        <div className={styles.contFooter}>
          <button className={styles.signInBTN} onClick={authUser}>Sign In</button>
          <span onClick={() => router.push('./SignUp')}>
            Don’t Have An Account? <span className={styles.createAcc}>Create An Account</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
