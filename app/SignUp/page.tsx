"use client";

import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setCookie } from "../helper/cookie";
import Image from "next/image";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(''); // State to handle error messages

  const router = useRouter();

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const confChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfPass(e.target.value);
  };

  const usernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const sendInfo = async () => {
    if (password !== confPass) {
      setError("Passwords do not match."); // Check if passwords match
      return;
    }
    axios.post("https://music-back-1s59.onrender.com/users", {
      name: username,
      email: email,
      password: password,
      confirmPassword: confPass,
      role:"user"
    }).then((response) =>{
      console.log(response.data.objfortoken.role);
      
      setCookie("userToken", response.data.token, 60);
      setCookie("isAdmin", response.data.objfortoken.role, 60);
      router.replace("http://localhost:3000");
    })
    .catch(() => {
      setError("Error signing up. Please try again."); // Set error message
      console.error('Sign-up error:', error);
    })
  }

  return (
    <div className={styles.login}>
      <div>
        <Image src="/Images/Login.png" alt="Login" width={300} height={200} />
      </div>
      <div className={styles.loginContainer}>
        <div className={styles.contHeader}>
          <h1>Create Your Account</h1> {/* Updated heading to reflect sign-up */}
          <span>Enter your details to register</span>
        </div>

        {error && <p className={styles.error}>{error}</p>} {/* Display error message */}

        <div className={styles.contBody}>
          <div className={styles.loginBody}>
            <div className={styles.emailCont}>
              <span>Username</span>
              <div className={styles.infoHolder}>
                <input
                  onChange={usernameChange}
                  className={styles.input}
                  type="text"
                  placeholder="Username"
                />
              </div>
            </div>
            <div className={styles.emailCont}>
              <span>Email</span>
              <div className={styles.infoHolder}>
                <input
                  onChange={emailChange}
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
                  onChange={passwordChange}
                  className={styles.input}
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className={styles.passCont}>
              <span>Verify Password</span>
              <div className={styles.infoHolder}>
                <input
                  onChange={confChange}
                  className={styles.input}
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.contFooter}>
          <button onClick={sendInfo} className={styles.signInBTN}>Sign Up</button>
          <span onClick={() => router.push('./Login')}>
            Already Have An Account? <span className={styles.createAcc}>Sign In</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
